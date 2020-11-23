## Groupomania

Application web / Réseau social

## Installation du Projet
1 - Téléchargez le repo   
2 - Extraire le dossier et mettez le projet à la racine du dossier.   
3 - Créez un dossier config en plaçant le fichier qui se trouve dans le livrable (config.json), puis placez-le à la racine du dossier backend.   
4 - Téléchargez MAMP : `https://www.mamp.info/en/downloads/`   
5 - Installez MAMP, mettez le en marche en appuyant sur le bouton vert (vérifier bien que MySQL server et Apache server sont bien lancer). Ouvrez un terminal et tapez `cd C:\`, tapez de nouveau `..\\MAMP\bin\mysql\bin\mysql -u root -p`   
6 - Entrez `root` comme mot de passe puis vous allez avoir `mysql>` (qui est le terminal mysql)   
7 - Création de la database (toujours dans le terminal mysql) :   
  - Tapez `create database database_development;`     
  - Quittez le terminal en tappant `exit` puis sur la touche entrer.  
     
8 - Allez dans l'interface MAMP et cliquez sur `Open WebStart page`, un navigateur va s'ouvrir puis cliquer sur `Tools` puis `phpMyAdmin`  
9 - Sur la gauche vous aurez les databases, cliquez sur `database_development` puis `import`, insérez le fichier `database_development.sql` et appuyer sur le bouton `go` ou `executer`
10 - Ouvrez un nouveau terminal sur le dossier projet puis tapez `cd backend`.  
11 - Tapez `npm i`  
12 - Tapez `npm i -g sequelize-cli ` qui permettra d'installer sequelize-cli sur l'ensemble de la machine.    
13 - Tapez `nodemon server` ou `node server`.  
14 - Ouvrez un nouveau terminal sur le dossier du projet puis tapez `cd frontend`, puis `cd groupomania-app` et enfin `npm i`.  
15 - Tapez `npm run serve` pour lancer l'application web.  
16 - Si la page ne s'ouvre pas directement au lancement allez sur la page `http://localhost:8080/`

## phpMyAdmin
Cette partie peut-être utile si vous n'arrivez pas à utiliser phpMyAdmin directement sur MAMP.
phpMyAdmin n'est pas obligatoire pour le fonctionnement de l'app web mais peut être très utile dans la gestion de la base de données.  
Vous pouvez installer phpMyAdmin et l'ajouter dans le dossier MAMP (le chemin : `C:\MAMP\htdocs`), dans htdocs veuillez à mettre le mot de passe `root`.  
(Veuillez à supprimer les fichiers dans le dossier htdocs avant d'y ajouter  le dossier phpMyAdmin).  

## MAMP
MAMP a été utilisé pour ce projet mais vous pouvez utiliser d'autres paquetages (WAMP, XAMPP...)