ifdef ENVIRONMENT
	ENVIRONMENT := $(ENVIRONMENT)
else
	ENVIRONMENT := local
endif

ifdef BRANCH
	BRANCH := $(BRANCH)
else
	BRANCH := dev
endif

build:
	sudo docker-compose -f ${ENVIRONMENT}.yml build

up:
	sudo docker-compose -f ${ENVIRONMENT}.yml up

down:
	sudo docker-compose -f ${ENVIRONMENT}.yml down

start:
	sudo docker-compose -f ${ENVIRONMENT}.yml down && \
	sudo docker-compose -f ${ENVIRONMENT}.yml up --build

migrations:
	sudo docker-compose -f ${ENVIRONMENT}.yml run --rm django python manage.py makemigrations && \
	sudo docker-compose -f ${ENVIRONMENT}.yml run --rm django python manage.py migrate

test:
	sudo docker-compose -f ${ENVIRONMENT}.yml run --rm django pytest . -s

shell:
	sudo docker-compose -f ${ENVIRONMENT}.yml run --rm django python manage.py shell

superuser:
	sudo docker-compose -f ${ENVIRONMENT}.yml run --rm django python manage.py createsuperuser

reset-db:
	sudo docker-compose -f ${ENVIRONMENT}.yml down && \
	sudo docker-compose -f ${ENVIRONMENT}.yml run --rm django python manage.py reset_db && \
	sudo docker-compose -f ${ENVIRONMENT}.yml run --rm django python manage.py makemigrations && \
	sudo docker-compose -f ${ENVIRONMENT}.yml run --rm django python manage.py migrate

reset-db-hard:
	sudo find . -path "*/migrations/*.py" -not -name "__init__.py" -not -path "*/contrib/*" -delete && \
	sudo find . -path "*/migrations/*.pyc" -path "*/migrations/__pycache__/*.pyc" -delete && \
	sudo docker-compose -f ${ENVIRONMENT}.yml down && \
	sudo docker-compose -f ${ENVIRONMENT}.yml run --rm django python manage.py reset_db && \
	sudo docker-compose -f ${ENVIRONMENT}.yml run --rm django python manage.py makemigrations && \
	sudo docker-compose -f ${ENVIRONMENT}.yml run --rm django python manage.py migrate

update-server:
	git pull origin ${BRANCH} && \
	docker-compose -f ${ENVIRONMENT}.yml build && \
	docker-compose -f ${ENVIRONMENT}.yml run --rm django python manage.py migrate

mypy:
	sudo docker-compose -f ${ENVIRONMENT}.yml run --rm django mypy django_nustjs_rest_auth_example

flake8:
	sudo docker-compose -f ${ENVIRONMENT}.yml run --rm django flake8 django_nustjs_rest_auth_example

black:
	sudo docker-compose -f ${ENVIRONMENT}.yml run --rm django black --py36 django_nustjs_rest_auth_example

coverage:
	sudo docker-compose -f ${ENVIRONMENT}.yml run --rm django coverage run -m py.test
	sudo docker-compose -f ${ENVIRONMENT}.yml run --rm django coverage report
	sudo docker-compose -f ${ENVIRONMENT}.yml run --rm django coverage html

pre-commit:
	sudo docker-compose -f ${ENVIRONMENT}.yml run --rm django mypy django_nustjs_rest_auth_example
	sudo docker-compose -f ${ENVIRONMENT}.yml run --rm django flake8 django_nustjs_rest_auth_example
	sudo docker-compose -f ${ENVIRONMENT}.yml run --rm django black --py36 django_nustjs_rest_auth_example
	sudo docker-compose -f ${ENVIRONMENT}.yml run --rm django coverage run -m py.test
	sudo docker-compose -f ${ENVIRONMENT}.yml run --rm django coverage report
	sudo docker-compose -f ${ENVIRONMENT}.yml run --rm django coverage html

remove-pycache:
	sudo find . -type f -name "*.py[co]" -delete && \
	sudo find . -type d -name "__pycache__" -delete

update-submodules:
	git submodule update --force
	git submodule foreach git pull origin dev

vizualization:
	sudo docker-compose -f ${ENVIRONMENT}.yml run --rm django python manage.py graph_models --pygraphviz -a -g -o visualized_models.svg -L en-us -e
