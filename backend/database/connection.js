import pg from 'pg';
import 'dotenv/config';
import { cart } from '../Model/user.model.js';

const { Pool } = pg;

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT // Default PostgreSQL port
});

export const dbInit = async ()=>{
    try {
        const myData= await pool.connect();
        const rows = await myData.query("SELECT NOW ()");
        await cart();
    } catch (error) {
        process.exit(1)
    }
}

export const query = async (text, params) => {
    const start = Date.now()
    const res = await pool.query(text, params)
    const duration = Date.now() - start
    return res
  }