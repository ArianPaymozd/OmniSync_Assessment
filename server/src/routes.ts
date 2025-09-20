import express from 'express';
import { clearClicks, getCards, incrementClick } from './controllers';

const router = express.Router();

// Define your routes here
router.get('/cards', getCards);
router.post('/cards/increment', incrementClick);
router.post('/cards/clear', clearClicks);

export default router;