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

const httpRequestsTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
  registers: [register]
});

const activeUsers = new promClient.Gauge({
  name: 'total_users',
  help: 'Number of users',
  registers: [register]
});

const totalBoards = new promClient.Gauge({
  name: 'total_boards',
  help: 'Number of boards',
  registers: [register]
});

const totalLists = new promClient.Gauge({
  name: 'total_lists',
  help: 'Number of lists',
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
  httpRequestsTotal,
  activeUsers,
  totalBoards,
  totalLists,
  totalCards,
  cardsByStatus
};
