import express from 'express';
import SheetsService from '../services/sheetsService.js';
import { SHEETS } from '../config/googleSheets.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const transactionsSheet = new SheetsService(SHEETS.TRANSACTIONS);

// Get all transactions
router.get('/', async (req, res, next) => {
  try {
    const rows = await transactionsSheet.getAll();
    const transactions = rows.map(row => ({
      id: row[0],
      name: row[1],
      amount: parseFloat(row[2]),
      category: row[3],
      type: row[4],
      date: row[5],
      emoji: row[6],
    }));
    res.json(transactions);
  } catch (error) {
    next(error);
  }
});

// Get single transaction
router.get('/:id', async (req, res, next) => {
  try {
    const { row } = await transactionsSheet.findById(req.params.id);
    if (!row) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    const transaction = {
      id: row[0],
      name: row[1],
      amount: parseFloat(row[2]),
      category: row[3],
      type: row[4],
      date: row[5],
      emoji: row[6],
    };
    res.json(transaction);
  } catch (error) {
    next(error);
  }
});

// Create transaction
router.post('/', async (req, res, next) => {
  try {
    const { name, amount, category, type, date, emoji } = req.body;
    const id = uuidv4();

    await transactionsSheet.append([id, name, amount, category, type, date, emoji]);

    res.status(201).json({
      id,
      name,
      amount,
      category,
      type,
      date,
      emoji,
    });
  } catch (error) {
    next(error);
  }
});

// Update transaction
router.put('/:id', async (req, res, next) => {
  try {
    const { index } = await transactionsSheet.findById(req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    const { name, amount, category, type, date, emoji } = req.body;
    await transactionsSheet.update(index, [
      req.params.id,
      name,
      amount,
      category,
      type,
      date,
      emoji,
    ]);

    res.json({ id: req.params.id, name, amount, category, type, date, emoji });
  } catch (error) {
    next(error);
  }
});

// Delete transaction
router.delete('/:id', async (req, res, next) => {
  try {
    const { index } = await transactionsSheet.findById(req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    await transactionsSheet.delete(index);
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;