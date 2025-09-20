    import express, {Request} from 'express';
    import cors from "cors"
    import { Pool } from 'pg'
    import router from './routes';

    const app = express();
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    const port = process.env.PORT || 8000;
    app.use(cors())

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
            res.json(result.rows);
        } catch (err) {
            console.error('Error connecting to PostgreSQL:', err);
            res.status(500).send('Error connecting to database');
        }
    });
    app.use('/api', router);

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });