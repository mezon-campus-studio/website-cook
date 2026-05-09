const { HealthService } = require('../../business/services/health.service');
const { HealthRepository } = require('../../repository/health.repository');

class HealthController {
  constructor() {
    // wire dependencies (simple manual DI)
    const repository = new HealthRepository();
    this.healthService = new HealthService(repository);
  }

  async getHealth(req, res) {
    const result = await this.healthService.getHealth();
    return res.json(result);
  }
}

module.exports = { HealthController };

