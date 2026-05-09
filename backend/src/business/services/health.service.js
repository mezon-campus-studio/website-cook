class HealthService {
  constructor(healthRepository) {
    this.healthRepository = healthRepository;
  }

  async getHealth() {
    // business logic could be expanded later
    const status = await this.healthRepository.getStatus();
    return {
      ok: true,
      status
    };
  }
}

module.exports = { HealthService };

