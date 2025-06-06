class EnergyManager:
    def __init__(self, efficiency):
        self.energy = 100.0
        self.efficiency = efficiency

    def consume(self):
        self.energy -= 0.5 * (1.0 - self.efficiency)

    def is_dead(self):
        return self.energy <= 0
