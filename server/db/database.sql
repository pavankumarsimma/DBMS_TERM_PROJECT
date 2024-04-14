CREATE database tsdb;
-- \c tsdb
CREATE EXTENSION IF NOT EXISTS timescaledb;

-- psql -U postgres -h localhost -d tsdb

CREATE TABLE stocks_real_time (
  time TIMESTAMPTZ NOT NULL,
  symbol TEXT NOT NULL,
  price DOUBLE PRECISION NULL,
  day_volume INT NULL
);

SELECT create_hypertable('stocks_real_time', by_range('time'));

CREATE INDEX ix_symbol_time ON stocks_real_time (symbol, time DESC);

CREATE TABLE company (
  symbol TEXT NOT NULL,
  name TEXT NOT NULL
);

-- \COPY stocks_real_time from './tutorial_sample_tick.csv' DELIMITER ',' CSV HEADER;
-- \COPY company from './tutorial_sample_company.csv' DELIMITER ',' CSV HEADER;


CREATE MATERIALIZED VIEW one_day_candle
WITH (timescaledb.continuous) AS
    SELECT
        time_bucket('1 day', time) AS bucket,
        symbol,
        FIRST(price, time) AS "open",
        MAX(price) AS high,
        MIN(price) AS low,
        LAST(price, time) AS "close",
        LAST(day_volume, time) AS day_volume
    FROM stocks_real_time
    GROUP BY bucket, symbol;

CREATE MATERIALIZED VIEW one_day_candle_with_latest_volume AS
WITH latest_day_volumes AS (
    SELECT
        time_bucket('1 day', time) AS bucket,
        symbol,
        FIRST(price, time) AS "open",
        MAX(price) AS high,
        MIN(price) AS low,
        LAST(price, time) AS "close",
        MAX(day_volume) AS latest_day_volume
    FROM stocks_real_time
    WHERE day_volume IS NOT NULL
    GROUP BY bucket, symbol
)
SELECT
    l.bucket,
    l.symbol,
    l.open,
    l.high,
    l.low,
    l.close,
    COALESCE(l.latest_day_volume, prev.latest_day_volume) AS day_volume
FROM latest_day_volumes l
LEFT JOIN LATERAL (
    SELECT latest_day_volume
    FROM latest_day_volumes
    WHERE symbol = l.symbol AND bucket < l.bucket
    ORDER BY bucket DESC
    LIMIT 1
) AS prev ON true;


SELECT add_continuous_aggregate_policy('one_day_candle',
    start_offset => INTERVAL '3 days',
    end_offset => INTERVAL '1 day',
    schedule_interval => INTERVAL '1 day');


-- queries
SELECT * FROM one_day_candle
WHERE symbol = 'AAPL' AND bucket >= NOW() - INTERVAL '14 days'
ORDER BY bucket;

SELECT * FROM one_day_candle
WHERE symbol = 'AAPL'
ORDER BY bucket DESC limit 1;

ALTER TABLE stocks_real_time 
SET (
    timescaledb.compress, 
    timescaledb.compress_segmentby='symbol', 
    timescaledb.compress_orderby='time DESC'
);

SELECT compress_chunk(c) from show_chunks('stocks_real_time') c;

SELECT 
    pg_size_pretty(before_compression_total_bytes) as before,
    pg_size_pretty(after_compression_total_bytes) as after
 FROM hypertable_compression_stats('stocks_real_time');

 SELECT add_compression_policy('stocks_real_time', INTERVAL '8 days');

SELECT
    time_bucket('30min', time) AS bucket,
    symbol,
    FIRST(price, time) AS "open",
    MAX(price) AS high,
    MIN(price) AS low,
    LAST(price, time) AS "close",
    LAST(day_volume, time) AS day_volume
FROM stocks_real_time where symbol='AAPL'
GROUP BY bucket, symbol;

SELECT decompress_chunk(c) from show_chunks('stocks_real_time') c;

-- before | after 
-- --------+-------
--  672 MB | 60 MB


-- Time: 1692.740 ms (00:01.693) without compression
-- Time: 1011.738 ms (00:01.012) with compression


SELECT
    symbol,
    MIN(price) FILTER (WHERE time >= start_datetime) AS "open",
    MAX(price) FILTER (WHERE time <= end_datetime) AS "close",
    MAX(price) FILTER (WHERE time >= start_datetime AND time <= end_datetime) AS high,
    MIN(price) FILTER (WHERE time >= start_datetime AND time <= end_datetime) AS low,
    SUM(day_volume) FILTER (WHERE time >= start_datetime AND time <= end_datetime) AS volume
FROM
    stocks_real_time
WHERE
    time BETWEEN start_datetime AND end_datetime
GROUP BY
    symbol;


SELECT
    symbol,
    MIN(price) FILTER (WHERE time::date = '2024-03-28') AS "open",
    MAX(price) FILTER (WHERE time::date = '2024-03-28') AS "close",
    MAX(price) FILTER (WHERE time::date = '2024-03-28') AS high,
    MIN(price) FILTER (WHERE time::date = '2024-03-28') AS low,
    SUM(day_volume) FILTER (WHERE time::date = '2024-03-28') AS volume
FROM
    stocks_real_time
WHERE
    time::date = '2024-03-28'
GROUP BY
    symbol;


SELECT
    symbol,
    FIRST(price, time) FILTER (WHERE time::date = '2024-03-28') AS "open",
    LAST(price, time) FILTER (WHERE time::date = '2024-03-28') AS "close",
    MAX(price) FILTER (WHERE time::date = '2024-03-28') AS high,
    MIN(price) FILTER (WHERE time::date = '2024-03-28') AS low,
    SUM(day_volume) FILTER (WHERE time::date = '2024-03-28') AS volume
FROM
    stocks_real_time
WHERE
    time::date = '2024-03-28'
GROUP BY
    symbol;


SELECT
    time_bucket('8h', time) AS bucket,
    FIRST(price, time) FILTER (WHERE time >= '2024-03-28 09:15:00' ) AS "open",
    LAST(price, time) FILTER (WHERE  time <= '2024-03-28 15:30:00') AS "close",
    MAX(price) FILTER (WHERE  time >= '2024-03-28 09:15:00' AND time <= '2024-03-28 15:30:00') AS high,
    MIN(price) FILTER (WHERE  time >= '2024-03-28 09:15:00' AND time <= '2024-03-28 15:30:00') AS low,
    SUM(day_volume) FILTER (WHERE time >= '2024-03-28 09:15:00' AND time <= '2024-03-28 15:30:00') AS volume
FROM
    stocks_real_time
WHERE
    time >= '2024-03-28 09:15:00' AND
    time <= '2024-03-28 15:30:00'
GROUP BY
    stocks_real_time.time;




CREATE TABLE real_time (
  symbol TEXT NOT NULL,
  name TEXT NOT NULL,
  price DOUBLE PRECISION NULL
);


SELECT
    time_bucket('${interval}', time) AS bucket,
    symbol,
    FIRST(price, time) FILTER (WHERE time >= '${start}' ) AS "open",
    LAST(price, time) FILTER (WHERE  time <= '${end}') AS "close",
    MAX(price) FILTER (WHERE  time >= '${start}' AND time <= '${end}') AS high,
    MIN(price) FILTER (WHERE  time >= '${start}' AND time <= '${end}') AS low,
    SUM(day_volume) FILTER (WHERE time >= '${start}' AND time <= '${end}') AS volume
    FROM
    stocks_real_time
    WHERE
    symbol = '${symbol}' AND
    time >= '${start}' AND
    time <= '${end}'
    GROUP BY
    symbol, stocks_real_time.time


SELECT DISTINCT ON (time_bucket('${interval}', time))
    time_bucket('${interval}', time) AS bucket,
    symbol,
    FIRST(price, time) FILTER (WHERE time >= '${start}' ) AS "open",
    LAST(price, time) FILTER (WHERE  time <= '${end}') AS "close",
    MAX(price) FILTER (WHERE  time >= '${start}' AND time <= '${end}') AS high,
    MIN(price) FILTER (WHERE  time >= '${start}' AND time <= '${end}') AS low,
    SUM(day_volume) FILTER (WHERE time >= '${start}' AND time <= '${end}') AS volume
    FROM
    stocks_real_time
    WHERE
    symbol = '${symbol}' AND
    time >= '${start}' AND
    time <= '${end}' 
    GROUP BY
    symbol, stocks_real_time.time
    order by bucket, time;

SELECT DISTINCT ON (time_bucket('1 day', time))
    time_bucket('1 day', time) AS bucket,
    symbol,
    FIRST(price, time) FILTER (WHERE time >= '2024-04-12' ) AS "open",
    LAST(price, time) FILTER (WHERE  time <= '2024-04-13') AS "close",
    MAX(price) FILTER (WHERE  time >= '2024-04-12' AND time <= '2024-04-13') AS high,
    MIN(price) FILTER (WHERE  time >= '2024-04-12' AND time <= '2024-04-13') AS low,
    SUM(day_volume) FILTER (WHERE time >= '2024-04-12' AND time <= '2024-04-13') AS volume
    FROM
    stocks_real_time
    WHERE
    symbol = 'AAPL' AND
    time >= '2024-04-12' AND
    time <= '2024-04-13' 
    GROUP BY
    symbol, stocks_real_time.time
    order by bucket, time;



WITH latest_date AS (
    SELECT MAX(DATE_TRUNC('day', time)) AS latest_date
    FROM stocks_real_time
),
latest_day_data AS (
    SELECT
        time_bucket('1 day', time) AS bucket,
        symbol,
        FIRST(price, time) FILTER (WHERE time::date = latest_date AND symbol = 'TSLA') AS "open",
        LAST(price, time) FILTER (WHERE time::date = latest_date AND symbol = 'TSLA') AS "close",
        MAX(price) FILTER (WHERE time::date = latest_date AND symbol = 'TSLA') AS "high",
        MIN(price) FILTER (WHERE time::date = latest_date AND symbol = 'TSLA') AS "low"
    FROM
        stocks_real_time, latest_date
    WHERE
        time::date = latest_date
    GROUP BY
        symbol, time_bucket('1 day', time)
)
SELECT
    symbol,
    "open",
    "close",
    "high",
    "low"
FROM
    latest_day_data
ORDER BY
    bucket DESC
LIMIT
    1;


WITH latest_date AS (
    SELECT MAX(DATE_TRUNC('day', time)) AS latest_date
    FROM stocks_real_time
),
latest_day_data AS (
    SELECT
        time_bucket('1 day', time) AS bucket,
        symbol,
        FIRST(price, time) FILTER (WHERE time::date = latest_date AND symbol = 'TSLA') AS "open",
        LAST(price, time) FILTER (WHERE time::date = latest_date AND symbol = 'TSLA') AS "close",
        MAX(price) FILTER (WHERE time::date = latest_date AND symbol = 'TSLA') AS "high",
        MIN(price) FILTER (WHERE time::date = latest_date AND symbol = 'TSLA') AS "low"
    FROM
        stocks_real_time, latest_date
    WHERE
        time::date = latest_date
    GROUP BY
        symbol, time_bucket('1 day', time)
)
SELECT
    symbol,
    "open",
    "close",
    "high",
    "low"
FROM
    latest_day_data
WHERE 
    symbol='TSLA'
ORDER BY
    bucket DESC;


SELECT
    time_bucket('1 day', time) AS bucket,
    symbol,
    FIRST(price, time) AS "open",
    LAST(price, time) AS "close",
    MAX(price) AS "high",
    MIN(price) AS "low"
FROM
    stocks_real_time
WHERE
    symbol = 'YourCompanySymbol'
    AND time >= NOW() - INTERVAL '30 days'
GROUP BY
    bucket, symbol
ORDER BY
    bucket DESC;
