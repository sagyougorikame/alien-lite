import pygame
import math
import random

FONT = pygame.font.Font(None, 14)

def render_all(screen, cells):
    for idx, cell in enumerate(cells):
        pos = cell.body.position
        angle = cell.body.angle
        x, y = int(pos.x), int(pos.y)

        r = int(255 * (1.0 - cell.energy.efficiency))
        g = int(255 * cell.energy.efficiency)
        color = (r, g, 50)

        pygame.draw.circle(screen, color, (x, y), 10)

        bar_width = 20
        energy_ratio = max(0.0, min(cell.energy.energy / 100.0, 1.0))
        pygame.draw.rect(screen, (50, 50, 50), (x - 10, y - 20, bar_width, 4))
        pygame.draw.rect(screen, (0, 255, 0), (x - 10, y - 20, bar_width * energy_ratio, 4))

        if hasattr(cell.brain, "last_output"):
            dx = math.cos(angle) * 15 * cell.brain.last_output[1]
            dy = math.sin(angle) * 15 * cell.brain.last_output[1]
            pygame.draw.line(screen, (200, 200, 255), (x, y), (x + dx, y + dy), 2)

        id_text = FONT.render(f"{idx}", True, (255, 255, 255))
        screen.blit(id_text, (x - 5, y - 5))
