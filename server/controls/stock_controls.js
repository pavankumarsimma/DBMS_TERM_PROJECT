import pool from "../db/connect";
import fetch from 'node-fetch';

export const getAllSymbols = async(req, res, next) => {
    const client = await pool.connect();
    let result;
    try {
        await client.query('BEGIN');
        let queryText = 'select * from real_time';
        result = await client.query(queryText);
        
        await client.query('COMMIT');
    } catch (e) {
        await client.query('ROLLBACK');
        console.log(e);
    } finally {
        client.release();
    }
    if (!result){
        return res.status(404).json({message:"db error occured"});
    }
    else {
        return res.status(200).json(result.rows);
    }
};

export const getCurrPrice = async(req, res, next) => {
    const symbol = req.params.symbol;
    
    let result;
    if (symbol == "" || symbol == undefined){
        return res.status(500).json({message: "undefined data given"});
    }
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        let queryText = `select * from real_time where real_time.symbol='${symbol}'`;
        result = await client.query(queryText);
        
        await client.query('COMMIT');
    } catch (e) {
        await client.query('ROLLBACK');
        console.log(e);
    } finally {
        client.release();
    }
    if (!result){
        return res.status(404).json({message:"db error occured"});
    }
    else {
        return res.status(200).json(result.rows);
    }
};



export const getTimeseriesdata = async(req, res, next)=>{
    let {symbol,start, end, interval} = req.body;
    if (interval == undefined || interval==""){
        interval = "30min";
    }
    
    if (start==undefined ||end==undefined || symbol==undefined  ){
        return res.status(500).json({"message":"undefined data given"});
    }
    let result;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        let queryText = `
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
        `;
        result = await client.query(queryText);
        
        await client.query('COMMIT');
    } catch (e) {
        await client.query('ROLLBACK');
        console.log(e);
    } finally {
        client.release();
    }
    if (!result){
        return res.status(404).json({message:"db error occured"});
    }
    else {
        return res.status(200).json(result.rows);
    }
};

const symbolsPerBatch = 3; // Number of symbols to fetch per batch
const requestInterval = 30000; // Interval between batches in milliseconds (e.g., 10 seconds)

export async function fetchDataAndUpdateDatabase() {
    // const client = await pool.connect();
    try {
        //await client.query('BEGIN');

        // Get all the company symbols and names from the database
        const queryText = `SELECT symbol, name FROM company`;
        const result = await pool.query(queryText);
        const companies = result.rows;

        // Divide symbols into batches
        const batches = [];
        for (let i = 0; i < companies.length; i += symbolsPerBatch) {
            batches.push(companies.slice(i, i + symbolsPerBatch));
        }

        // Fetch real-time prices for each batch of symbols
        for (const batch of batches) {
            const symbolsString = batch.map(company => company.symbol).join(',');
            const response = await fetch(`https://api.twelvedata.com/price?symbol=${symbolsString}&apikey=${process.env.API_KEY}`);
            const data = await response.json();

            // Iterate over the fetched data and update or insert into real_time table
            for (const company of batch) {
                const symbol = company.symbol;
                const symbolData = data[symbol];
                if (symbolData && symbolData.price) {
                    const price = symbolData.price;
                    // Check if symbol already exists in real_time table
                    const existingRecord = await pool.query('SELECT * FROM real_time WHERE symbol = $1', [symbol]);
                    if (existingRecord.rows.length > 0) {
                        // Update existing record with new price
                        //console.log(symbol, price);
                        console.log('update', symbol, company.name);
                        await pool.query('UPDATE real_time SET price = $1 WHERE symbol = $2', [price, symbol]);
                    } else {
                        // Insert new record
                        console.log(symbol,company.name, price);
                        await pool.query('INSERT INTO real_time (symbol, name, price) VALUES ($1, $2, $3)', [symbol, company.name, price]);
                    }
                }
            }

            // Delay before making the next batch request
            await delay(requestInterval);
        }

        //await client.query('COMMIT');
        console.log('Data updated successfully.');

    } catch (error) {
        //await client.query('ROLLBACK');
        console.error('Error fetching or updating data:', error);

    } finally {
        // client.release();
    }
}

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
