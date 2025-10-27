.PHONY: help build up down logs clean dev prod

help:
	@echo "Comandos disponíveis:"
	@echo "  make dev      - Inicia ambiente de desenvolvimento"
	@echo "  make prod     - Inicia ambiente de produção"
	@echo "  make build    - Constrói as imagens Docker"
	@echo "  make up       - Inicia os containers"
	@echo "  make down     - Para os containers"
	@echo "  make logs     - Mostra logs dos containers"
	@echo "  make clean    - Remove containers, volumes e imagens"

dev:
	docker-compose -f docker-compose.dev.yml up --build

prod:
	docker-compose up --build

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f

clean:
	docker-compose down -v
	docker system prune -af
