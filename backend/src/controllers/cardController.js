const Card = require('../models/card');

const cardController = {
  async create(req, res) {
    try {
      const { title, description, listId, position } = req.body;

      if (!title || !listId) {
        return res.status(400).json({ error: 'Title and listId are required' });
      }

      const card = await Card.create({ title, description, listId, position: position || 0 });
      res.status(201).json(card);
    } catch (error) {
      console.error('Create card error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getByList(req, res) {
    try {
      const { listId } = req.params;
      const cards = await Card.findByListId(listId);
      res.json(cards);
    } catch (error) {
      console.error('Get cards error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getByBoard(req, res) {
    try {
      const { boardId } = req.params;
      const cards = await Card.findByBoardId(boardId);
      res.json(cards);
    } catch (error) {
      console.error('Get board cards error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const card = await Card.findById(id);
      if (!card) {
        return res.status(404).json({ error: 'Card not found' });
      }
      res.json(card);
    } catch (error) {
      console.error('Get card error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { title, description, listId, position, status } = req.body;

      const card = await Card.update(id, { title, description, listId, position, status });
      if (!card) {
        return res.status(404).json({ error: 'Card not found' });
      }
      res.json(card);
    } catch (error) {
      console.error('Update card error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const card = await Card.delete(id);
      if (!card) {
        return res.status(404).json({ error: 'Card not found' });
      }
      res.json({ message: 'Card deleted successfully' });
    } catch (error) {
      console.error('Delete card error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = cardController;
