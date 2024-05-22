#!/bin/bash

# Appliquer les migrations de la base de données
python manage.py makemigrations
python manage.py migrate

# Lancer le serveur 
python manage.py runserver 0.0.0.0:8000