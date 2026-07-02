const pool = require('../config/database');

class List {
  static async create({ title, boardId, position }) {
    const query = `
      INSERT INTO lists (title, board_id, position)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const result = await pool.query(query, [title, boardId, position]);
    return result.rows[0];
  }

  static async findById(id) {
    const query = 'SELECT * FROM lists WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async findByBoardId(boardId) {
    const query = 'SELECT * FROM lists WHERE board_id = $1 ORDER BY position ASC';
    const result = await pool.query(query, [boardId]);
    return result.rows;
  }

  static async update(id, { title, position }) {
    const query = `
      UPDATE lists 
      SET title = COALESCE($1, title), 
          position = COALESCE($2, position),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING *
    `;
    const result = await pool.query(query, [title, position, id]);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM lists WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = List;
