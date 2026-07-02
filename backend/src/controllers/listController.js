const List = require('../models/list');

const listController = {
  async create(req, res) {
    try {
      const { title, boardId, position } = req.body;

      if (!title || !boardId) {
        return res.status(400).json({ error: 'Title and boardId are required' });
      }

      const list = await List.create({ title, boardId, position: position || 0 });
      res.status(201).json(list);
    } catch (error) {
      console.error('Create list error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getByBoard(req, res) {
    try {
      const { boardId } = req.params;
      const lists = await List.findByBoardId(boardId);
      res.json(lists);
    } catch (error) {
      console.error('Get lists error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const list = await List.findById(id);
      if (!list) {
        return res.status(404).json({ error: 'List not found' });
      }
      res.json(list);
    } catch (error) {
      console.error('Get list error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { title, position } = req.body;

      const list = await List.update(id, { title, position });
      if (!list) {
        return res.status(404).json({ error: 'List not found' });
      }
      res.json(list);
    } catch (error) {
      console.error('Update list error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const list = await List.delete(id);
      if (!list) {
        return res.status(404).json({ error: 'List not found' });
      }
      res.json({ message: 'List deleted successfully' });
    } catch (error) {
      console.error('Delete list error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = listController;
