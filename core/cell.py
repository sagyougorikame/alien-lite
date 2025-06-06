from core.brain import Brain
from core.energy import EnergyManager
from core.physics import create_cell_body

class Cell:
    def __init__(self, dna, space):
        self.dna = dna
        self.brain = Brain(dna["brain"])
        self.energy = EnergyManager(dna.get("energy_efficiency", 0.8))
        self.body, self.shape = create_cell_body(dna["x"], dna["y"])
        space.add(self.body, self.shape)

    def update(self):
        decision = self.brain.think()
        self.energy.consume()

        if decision[0] > 0.5:
            self.body.angle += 0.1
        if decision[1] > 0.5:
            self.body.apply_force_at_local_point((100, 0))

        if self.energy.is_dead():
            self.body.velocity = (0, 0)
