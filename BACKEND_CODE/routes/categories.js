import express from 'express';
import SheetsService from '../services/sheetsService.js';
import { SHEETS } from '../config/googleSheets.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const categoriesSheet = new SheetsService(SHEETS.CATEGORIES);

// Get all categories
router.get('/', async (req, res, next) => {
  try {
    const rows = await categoriesSheet.getAll();
    const categories = rows.map(row => ({
      id: row[0],
      name: row[1],
      emoji: row[2],
      type: row[3],
    }));
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

// Create category
router.post('/', async (req, res, next) => {
  try {
    const { name, emoji, type } = req.body;
    const id = uuidv4();

    await categoriesSheet.append([id, name, emoji, type]);

    res.status(201).json({ id, name, emoji, type });
  } catch (error) {
    next(error);
  }
});

// Delete category
router.delete('/:id', async (req, res, next) => {
  try {
    const { index } = await categoriesSheet.findById(req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Category not found' });
    }

    await categoriesSheet.delete(index);
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;