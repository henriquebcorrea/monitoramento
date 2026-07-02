const pool = require('../config/database');

class Board {
  static async create({ title, description, userId, backgroundColor, listColor }) {
    const query = `
      INSERT INTO boards (title, description, user_id, background_color, list_color)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const result = await pool.query(query, [title, description, userId, backgroundColor, listColor]);
    return result.rows[0];
  }

  static async findById(id) {
    const query = 'SELECT * FROM boards WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async findByUserId(userId) {
    const query = 'SELECT * FROM boards WHERE user_id = $1 ORDER BY created_at DESC';
    const result = await pool.query(query, [userId]);
    return result.rows;
  }

  static async getAll() {
    const query = 'SELECT * FROM boards ORDER BY created_at DESC';
    const result = await pool.query(query);
    return result.rows;
  }

  static async update(id, { title, description, backgroundColor, listColor }) {
    const query = `
      UPDATE boards 
      SET title = COALESCE($1, title), 
          description = COALESCE($2, description),
          background_color = COALESCE($3, background_color),
          list_color = COALESCE($4, list_color),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $5
      RETURNING *
    `;
    const result = await pool.query(query, [title, description, backgroundColor, listColor, id]);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM boards WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = Board;
