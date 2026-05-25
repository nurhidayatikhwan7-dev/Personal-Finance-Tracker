import express from 'express';
import SheetsService from '../services/sheetsService.js';
import { SHEETS } from '../config/googleSheets.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const budgetsSheet = new SheetsService(SHEETS.BUDGETS);

// Get all budgets
router.get('/', async (req, res, next) => {
  try {
    const rows = await budgetsSheet.getAll();
    const budgets = rows.map(row => ({
      id: row[0],
      categoryId: row[1],
      amount: parseFloat(row[2]),
      period: row[3],
    }));
    res.json(budgets);
  } catch (error) {
    next(error);
  }
});

// Create budget
router.post('/', async (req, res, next) => {
  try {
    const { categoryId, amount, period } = req.body;
    const id = uuidv4();

    await budgetsSheet.append([id, categoryId, amount, period]);

    res.status(201).json({ id, categoryId, amount, period });
  } catch (error) {
    next(error);
  }
});

// Update budget
router.put('/:id', async (req, res, next) => {
  try {
    const { index } = await budgetsSheet.findById(req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Budget not found' });
    }

    const { categoryId, amount, period } = req.body;
    await budgetsSheet.update(index, [req.params.id, categoryId, amount, period]);

    res.json({ id: req.params.id, categoryId, amount, period });
  } catch (error) {
    next(error);
  }
});

// Delete budget
router.delete('/:id', async (req, res, next) => {
  try {
    const { index } = await budgetsSheet.findById(req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Budget not found' });
    }

    await budgetsSheet.delete(index);
    res.json({ message: 'Budget deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;