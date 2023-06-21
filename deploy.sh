#!/bin/bash

# Mettre à jour le code source
git pull

# Construire l'image Docker
docker build --no-cache -t locmns .

# Arreter le conteneur existant
docker stop conteneur-angular-locmns

# Supprimer le conteneur existant
docker rm conteneur-angular-locmns

# Lancer un nouveau conteneur
docker run -d --name=conteneur-angular-locmns -p 4200:80 locmns