const pool = require('../config/database');
const { activeUsers, totalBoards, totalCards, totalLists, cardsByStatus } = require('../config/prometheus');

const metricsService = {
  async updateMetrics() {
    try {
      // Update total users
      const usersResult = await pool.query('SELECT COUNT(*) FROM users');
      activeUsers.set(parseInt(usersResult.rows[0].count));

      // Update total boards
      const boardsResult = await pool.query('SELECT COUNT(*) FROM boards');
      totalBoards.set(parseInt(boardsResult.rows[0].count));

      // Update total lists
      const listsResult = await pool.query('SELECT COUNT(*) FROM lists');
      totalLists.set(parseInt(listsResult.rows[0].count));

      // Update total cards
      const cardsResult = await pool.query('SELECT COUNT(*) FROM cards');
      totalCards.set(parseInt(cardsResult.rows[0].count));

      // Update cards by status (using the actual status field)
      const todoCards = await pool.query("SELECT COUNT(*) FROM cards WHERE status = 'todo'");
      const inProgressCards = await pool.query("SELECT COUNT(*) FROM cards WHERE status = 'in_progress'");
      const doneCards = await pool.query("SELECT COUNT(*) FROM cards WHERE status = 'done'");

      cardsByStatus.set({ status: 'todo' }, parseInt(todoCards.rows[0].count));
      cardsByStatus.set({ status: 'in_progress' }, parseInt(inProgressCards.rows[0].count));
      cardsByStatus.set({ status: 'done' }, parseInt(doneCards.rows[0].count));
    } catch (error) {
      console.error('Error updating metrics:', error);
    }
  }
};

module.exports = metricsService;
