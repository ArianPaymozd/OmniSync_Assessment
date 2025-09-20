    import express from 'express';
    import { Pool } from 'pg'

    const app = express();
    const port = process.env.PORT || 8000;

    const pool = new Pool({
        user: process.env.POSTGRES_USER,
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
        port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432,
    });

    app.get('/test_seed', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM cards');
        client.release();
        console.log(result.rows)
        res.json(JSON.stringify(result.rows));
    } catch (err) {
        console.error('Error connecting to PostgreSQL:', err);
        res.status(500).send('Error connecting to database');
    }
    });

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });