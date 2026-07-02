const promClient = require('prom-client');

const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });

// Custom metrics
const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  registers: [register]
});

const activeUsers = new promClient.Gauge({
  name: 'active_users_total',
  help: 'Number of active users',
  registers: [register]
});

const totalBoards = new promClient.Gauge({
  name: 'total_boards',
  help: 'Number of boards',
  registers: [register]
});

const totalCards = new promClient.Gauge({
  name: 'total_cards',
  help: 'Number of cards',
  registers: [register]
});

const cardsByStatus = new promClient.Gauge({
  name: 'cards_by_status',
  help: 'Number of cards by status',
  labelNames: ['status'],
  registers: [register]
});

module.exports = {
  register,
  httpRequestDuration,
  activeUsers,
  totalBoards,
  totalCards,
  cardsByStatus
};
