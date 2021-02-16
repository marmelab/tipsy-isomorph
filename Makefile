.PHONY: default install start test

.DEFAULT_GOAL := help

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install:
	@echo "Install project"
	docker-compose run --rm tipsy-isomorph yarn install

start:
	@echo "Start the project"
	docker-compose up --force-recreate -d
	
test:
	@echo "Launch the tests"
	docker-compose run --rm tipsy-isomorph yarn test

build:
	@echo "Launch the tests"
	docker-compose run --rm tipsy-isomorph yarn build

dev:
	@echo "Dev mode"
	docker-compose run -p 3000:3000 --rm tipsy-isomorph yarn dev