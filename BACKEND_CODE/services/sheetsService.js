import { getSheets, SPREADSHEET_ID } from '../config/googleSheets.js';

class SheetsService {
  constructor(sheetName) {
    this.sheetName = sheetName;
  }

  // Get all rows from sheet
  async getAll() {
    try {
      const sheets = await getSheets();
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `${this.sheetName}!A2:Z`,
      });

      const rows = response.data.values || [];
      return rows;
    } catch (error) {
      console.error(`Error getting data from ${this.sheetName}:`, error);
      throw error;
    }
  }

  // Add new row
  async append(values) {
    try {
      const sheets = await getSheets();
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: `${this.sheetName}!A:Z`,
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: [values],
        },
      });

      return response.data;
    } catch (error) {
      console.error(`Error appending to ${this.sheetName}:`, error);
      throw error;
    }
  }

  // Update specific row
  async update(rowIndex, values) {
    try {
      const sheets = await getSheets();
      const response = await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${this.sheetName}!A${rowIndex + 2}:Z${rowIndex + 2}`,
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: [values],
        },
      });

      return response.data;
    } catch (error) {
      console.error(`Error updating ${this.sheetName}:`, error);
      throw error;
    }
  }

  // Delete row (by clearing it)
  async delete(rowIndex) {
    try {
      const sheets = await getSheets();
      const response = await sheets.spreadsheets.values.clear({
        spreadsheetId: SPREADSHEET_ID,
        range: `${this.sheetName}!A${rowIndex + 2}:Z${rowIndex + 2}`,
      });

      return response.data;
    } catch (error) {
      console.error(`Error deleting from ${this.sheetName}:`, error);
      throw error;
    }
  }

  // Find row by ID (assumes ID is in column A)
  async findById(id) {
    const rows = await this.getAll();
    const index = rows.findIndex(row => row[0] === id);
    return { row: rows[index], index };
  }
}

export default SheetsService;