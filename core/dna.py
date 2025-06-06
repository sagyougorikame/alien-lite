import json


def load_dna(path):
    with open(path, "r") as f:
        return json.load(f)
