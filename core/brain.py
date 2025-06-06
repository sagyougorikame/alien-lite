import random

class Brain:
    def __init__(self, weights):
        self.weights = weights

    def think(self):
        self.last_output = [w[0] + random.uniform(-0.05, 0.05) for w in self.weights]
        return self.last_output
