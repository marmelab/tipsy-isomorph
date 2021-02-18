.PHONY: default install start test

.DEFAULT_GOAL := help

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install:
	@echo "Install project"
	docker-compose run --rm tipsy-isomorph yarn install

start:
	@echo "Start the project"
	docker-compose run --rm tipsy-isomorph yarn build
	docker-compose up --force-recreate -d

stop:
	@echo "Stop the project"
	docker-compose down

test:
	@echo "Launch the tests"
	docker-compose run --rm tipsy-isomorph yarn test

e2e:
	@echo "Launch e2e"
	docker-compose -f docker-compose-e2e.yml up --force-recreate -d
	docker-compose -f docker-compose-e2e.yml exec tipsy-isomorph yarn run cypress install
	docker-compose -f docker-compose-e2e.yml exec tipsy-isomorph yarn run cypress run
	docker-compose -f docker-compose-e2e.yml down

build:
	@echo "Build the app"
	docker-compose run --rm tipsy-isomorph yarn build

dev:
	@echo "Dev mode"
	docker-compose run -p 3000:3000 --rm tipsy-isomorph yarn dev