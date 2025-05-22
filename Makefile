.PHONY: up down build logs clean ps

# Start the application
up:
	docker-compose up -d

# Stop the application
down:
	docker-compose down

# Build and start the application
build:
	docker-compose up --build -d

# View logs
logs:
	docker-compose logs -f

# List running containers
ps:
	docker-compose ps

# Clean up containers, volumes, and images
clean:
	docker-compose down -v
	docker system prune -f

# Restart the application
restart:
	docker-compose restart

# Show container status
status:
	docker-compose ps --format "table {{.Name}}\t{{.Status}}\t{{.Ports}}"