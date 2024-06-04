# API Django

## Introduction

Le but de ce projet est de créer une API de gestion de produits liés à une base de données. Pour cela, le stack techinique utilisé est le suivant:

- Back [fonctionnel]: Python avec Django et le framework REST, tests avec Postman
- Front [En cours] : NextJS-React, typescript, TailwindCSS
- - : Conteneurisation avec Docker [fonctionnel]

## Utilisation

Pour faire tourner le projet, utilisez le docker-compose comme ci-dessous (le front tourne sous le port 3000, le back sous le port 8000) :

```shell
docker-compose up --build
```

## Concept du site internet

### Description

Le site internet se veut pédagogique et ironique, il mêle une passion pour l'océan et la licence Pokemon.
Il propose aux utilisateurs des solutions absurdes pour attraper des planctons. En première page, des planctons seront présentés aux utilisateurs suivant les photos réalisées par Christian Sardet (Laboratoire d’Océanographie de Villefranche, CNRS) et présenté sur le site https://planktonchronicles.org/fr/. Le site aura une visé pédagogique et donnera des informations sur les différents types de planctons présentés : descriptions, localisation, besoin nutritionnel, etc.

### Fonctionnalités

Les utilisateurs pourront s'infomer rapidement sur les planctons, directement sur la première page, sans clique, ni changement de page. Ils auront la possibilité de choisir un plancton, puis une à trois propositions de solutions à coûts différents leurs sont proposés.
Exemple de solutions:

- low-cost: erlenmeyer, filet et de la chance
- middle-cost: ce qu’il y a dans la solution low-cost + microscope et une place dans un navire de pêche
- high-cost: un billet d’avion si la localisation du plancton est loin, un navire océanographique, l’organisation d’une campagne en mer, etc.
