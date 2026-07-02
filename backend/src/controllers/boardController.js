const Board = require('../models/board');

const boardController = {
  async create(req, res) {
    try {
      const { title, description } = req.body;
      const userId = req.userId;

      if (!title) {
        return res.status(400).json({ error: 'Title is required' });
      }

      const board = await Board.create({ title, description, userId });
      res.status(201).json(board);
    } catch (error) {
      console.error('Create board error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getAll(req, res) {
    try {
      const boards = await Board.getAll();
      res.json(boards);
    } catch (error) {
      console.error('Get boards error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getByUser(req, res) {
    try {
      const boards = await Board.findByUserId(req.userId);
      res.json(boards);
    } catch (error) {
      console.error('Get user boards error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const board = await Board.findById(id);
      if (!board) {
        return res.status(404).json({ error: 'Board not found' });
      }
      res.json(board);
    } catch (error) {
      console.error('Get board error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { title, description } = req.body;

      const board = await Board.update(id, { title, description });
      if (!board) {
        return res.status(404).json({ error: 'Board not found' });
      }
      res.json(board);
    } catch (error) {
      console.error('Update board error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const board = await Board.delete(id);
      if (!board) {
        return res.status(404).json({ error: 'Board not found' });
      }
      res.json({ message: 'Board deleted successfully' });
    } catch (error) {
      console.error('Delete board error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = boardController;
