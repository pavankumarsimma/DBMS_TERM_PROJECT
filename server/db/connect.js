import pkg from 'pg';
const { Pool } = pkg;
 
const pool = new Pool({
  host: 'localhost',
  user: 'pavan',
  password: 'pavan931',
  database: 'tsdb',
  port: 5432
});

export default pool;