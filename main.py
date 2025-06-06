import pygame
import pymunk
from core.dna import load_dna
from core.cell import Cell
from renderer.display import render_all

SCREEN_WIDTH, SCREEN_HEIGHT = 800, 600

def main():
    pygame.init()
    screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
    clock = pygame.time.Clock()
    space = pymunk.Space()
    dna_list = load_dna("data/seed_dna.json")

    cells = []
    for dna in dna_list:
        cell = Cell(dna, space)
        cells.append(cell)

    running = True
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False

        for cell in cells:
            cell.update()

        space.step(1/60)
        screen.fill((0, 0, 0))
        render_all(screen, cells)
        pygame.display.flip()
        clock.tick(60)

    pygame.quit()

if __name__ == "__main__":
    main()
