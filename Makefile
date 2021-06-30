build: ## Build the container
	docker build -t backend .

run: ## Run container
	docker run -p 3000:3000 backend

up: build run ## Run container

test:
	docker run -i --rm backend npm run test