import { Request, Response } from 'express'
import { Pool } from 'pg'


export const getCards = async (req: Request, res: Response) => {
    try {
        const pool = new Pool({
            user: process.env.POSTGRES_USER,
            host: process.env.POSTGRES_HOST,
            database: process.env.POSTGRES_DB,
            password: process.env.POSTGRES_PASSWORD,
            port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432,
        });

        const client = await pool.connect();
        const result = await client.query('SELECT * FROM cards');
        client.release();
        console.log(result.rows)
        res.json(JSON.stringify(result.rows));
    } catch (err) {
        console.error('Error connecting to PostgreSQL:', err);
        res.status(500).send('Error connecting to database');
    }
}

export const incrementClick = async (req: Request, res: Response) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).send('Invalid request body');
    }

    try {
        const pool = new Pool({
            user: process.env.POSTGRES_USER,
            host: process.env.POSTGRES_HOST,
            database: process.env.POSTGRES_DB,
            password: process.env.POSTGRES_PASSWORD,
            port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432,
        });

        const client = await pool.connect();
        
        const values = [id];
        const query = `
            UPDATE cards 
            SET first_click = CASE 
                WHEN first_click is NULL THEN NOW()
                ELSE first_click
            END,
            clicks = clicks + 1
            WHERE id = $1 RETURNING *
        `;

        const result = await client.query(query, values);
        client.release();

        if (result.rowCount === 0) {
            return res.status(404).send('Card not found');
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error updating click count:', err);
        res.status(500).send('Error updating click count');
    }
}

export const clearClicks = async (req: Request, res: Response) => {
    try {
        const pool = new Pool({
            user: process.env.POSTGRES_USER,
            host: process.env.POSTGRES_HOST,
            database: process.env.POSTGRES_DB,
            password: process.env.POSTGRES_PASSWORD,
            port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432,
        });

        const client = await pool.connect();
        const query = `
            UPDATE cards 
            SET clicks = 0, first_click = NULL
            RETURNING *
        `;

        await client.query(query);
        client.release();

        res.send('All click counts cleared');
    } catch (err) {
        console.error('Error clearing click counts:', err);
        res.status(500).send('Error clearing click counts');
    }
}