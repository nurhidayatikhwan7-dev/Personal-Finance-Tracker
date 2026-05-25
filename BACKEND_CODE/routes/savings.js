import express from 'express';
import SheetsService from '../services/sheetsService.js';
import { SHEETS } from '../config/googleSheets.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const savingsSheet = new SheetsService(SHEETS.SAVINGS);

// Get all savings goals
router.get('/', async (req, res, next) => {
  try {
    const rows = await savingsSheet.getAll();
    const savings = rows.map(row => ({
      id: row[0],
      name: row[1],
      targetAmount: parseFloat(row[2]),
      currentAmount: parseFloat(row[3]),
      emoji: row[4],
      deadline: row[5],
    }));
    res.json(savings);
  } catch (error) {
    next(error);
  }
});

// Create savings goal
router.post('/', async (req, res, next) => {
  try {
    const { name, targetAmount, currentAmount, emoji, deadline } = req.body;
    const id = uuidv4();

    await savingsSheet.append([id, name, targetAmount, currentAmount, emoji, deadline]);

    res.status(201).json({ id, name, targetAmount, currentAmount, emoji, deadline });
  } catch (error) {
    next(error);
  }
});

// Update savings goal
router.put('/:id', async (req, res, next) => {
  try {
    const { index } = await savingsSheet.findById(req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Savings goal not found' });
    }

    const { name, targetAmount, currentAmount, emoji, deadline } = req.body;
    await savingsSheet.update(index, [
      req.params.id,
      name,
      targetAmount,
      currentAmount,
      emoji,
      deadline,
    ]);

    res.json({ id: req.params.id, name, targetAmount, currentAmount, emoji, deadline });
  } catch (error) {
    next(error);
  }
});

// Delete savings goal
router.delete('/:id', async (req, res, next) => {
  try {
    const { index } = await savingsSheet.findById(req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Savings goal not found' });
    }

    await savingsSheet.delete(index);
    res.json({ message: 'Savings goal deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;