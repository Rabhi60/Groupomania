## Groupomania

Application web / Réseau social

## Installation du Projet
1 - Téléchargez le repo 
2 - Extraire le dossier et mettez le projet à la racine du dossier.
3 - Créez un dossier config en plaçant le fichier qui ce trouve dans le livrable, puis placez le à la racine du dossier backend.
4 - Téléchargez MAMP : `https://www.mamp.info/en/downloads/` 
5 - Installez MAMP, mettez le en marche en appuyant sur le bouton vert. Ouvrez un terminal et tapez `cd C:\`, tapez de nouveau `..\\MAMP\bin\mysql\bin\mysql -u root -p` 
6 - Entrez `root` comme mot de passe puis vous allez avoir `mysql>` (qui est le terminal mysql)
7 - Creation des database (toujours dans le terminal mysql) :
    1 - Tapez `create database database_developdatabase_development;` 
    2 - Tapez `create database database_developdatabase_test;` 
    3 - Tapez `create database database_developdatabase_production;`
    4 - Quittez le terminal en tappant `exit` puis sur la touche entrer
8 - Ouvrez un nouveau terminal sur le dossier projet puis tapez `cd backend`
9 - Tapez `npm i`
10 - Tapez `npm i -g sequelize-cli ` qui permettra d'installer sequelize-cli sur l'ensemble de la machine
11 - Tapez `sequelize db:migrate`
12 - Tapez `nodemon server` ou `node server`
13 - Ouvrez un terminal sur le dossier du projet puis tapez cd frontend, puis cd groupomania-app et enfin `npm i`
14 - Tapez `npm run serve` pour lancer l'application web

## Les plus
phpMyAdmin n'est pas obligatoire pour le fonctionnement de l'app web mais peut être très utile dans la gestion de la base de données.
Vous pouvez installer phpMyAdmin et l'ajouter dans le dossier MAMP (le chemin : `C:\MAMP\htdocs`), dans htdocs veuillez à mettre le mot de passe `root`.
(Veuillez à supprimer les fichiers dans le dossier htdocs avant d'y ajouter  le dossier phpMyAdmin).
