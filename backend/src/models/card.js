const pool = require('../config/database');

class Card {
  static async create({ title, description, listId, position, status }) {
    const query = `
      INSERT INTO cards (title, description, list_id, position, status)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const result = await pool.query(query, [title, description, listId, position, status || 'todo']);
    return result.rows[0];
  }

  static async findById(id) {
    const query = 'SELECT * FROM cards WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async findByListId(listId) {
    const query = 'SELECT * FROM cards WHERE list_id = $1 ORDER BY position ASC';
    const result = await pool.query(query, [listId]);
    return result.rows;
  }

  static async findByBoardId(boardId) {
    const query = `
      SELECT c.* FROM cards c
      JOIN lists l ON c.list_id = l.id
      WHERE l.board_id = $1
      ORDER BY l.position ASC, c.position ASC
    `;
    const result = await pool.query(query, [boardId]);
    return result.rows;
  }

  static async update(id, { title, description, listId, position, status }) {
    const query = `
      UPDATE cards 
      SET title = COALESCE($1, title), 
          description = COALESCE($2, description),
          list_id = COALESCE($3, list_id),
          position = COALESCE($4, position),
          status = COALESCE($5, status),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $6
      RETURNING *
    `;
    const result = await pool.query(query, [title, description, listId, position, status, id]);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM cards WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = Card;
