import pygame
import random

# Initialize Pygame
pygame.init()

# Set up the screen
screen_width = 800
screen_height = 600
screen = pygame.display.set_mode((screen_width, screen_height))
pygame.display.set_caption("Stress-Relieving Game")

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (255, 0, 0)

# Player
player_width = 50
player_height = 50
player_x = screen_width // 2 - player_width // 2
player_y = screen_height - player_height - 10
player_speed = 5

# Enemies
enemy_width = 50
enemy_height = 50
enemy_x = random.randint(0, screen_width - enemy_width)
enemy_y = -enemy_height
enemy_speed = 3

# Clock
clock = pygame.time.Clock()

# Main game loop
running = True
while running:
    screen.fill(WHITE)

    # Event handling
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Player movement
    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT] and player_x > 0:
        player_x -= player_speed
    if keys[pygame.K_RIGHT] and player_x < screen_width - player_width:
        player_x += player_speed

    # Enemy movement
    enemy_y += enemy_speed
    if enemy_y > screen_height:
        enemy_y = -enemy_height
        enemy_x = random.randint(0, screen_width - enemy_width)

    # Collision detection
    player_rect = pygame.Rect(player_x, player_y, player_width, player_height)
    enemy_rect = pygame.Rect(enemy_x, enemy_y, enemy_width, enemy_height)
    if player_rect.colliderect(enemy_rect):
        # Game over
        screen.fill(RED)
        font = pygame.font.Font(None, 100)
        text = font.render("Game Over", True, BLACK)
        screen.blit(text, (screen_width // 2 - text.get_width() // 2, screen_height // 2 - text.get_height() // 2))
        pygame.display.flip()
        pygame.time.wait(2000)  # Pause for 2 seconds
        player_x = screen_width // 2 - player_width // 2
        player_y = screen_height - player_height - 10
        enemy_y = -enemy_height
        enemy_x = random.randint(0, screen_width - enemy_width)

    # Draw player and enemy
    pygame.draw.rect(screen, BLACK, [player_x, player_y, player_width, player_height])
    pygame.draw.rect(screen, BLACK, [enemy_x, enemy_y, enemy_width, enemy_height])

    pygame.display.flip()
    clock.tick(60)

# Quit Pygame
pygame.quit()