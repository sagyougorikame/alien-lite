import pymunk

def create_cell_body(x, y):
    body = pymunk.Body(1, pymunk.moment_for_circle(1, 0, 10))
    body.position = x, y
    shape = pymunk.Circle(body, 10)
    shape.elasticity = 0.5
    return body, shape
