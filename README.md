
# BotSanté - Chatbot en Vanilla JavaScript 🤖🍎🏋️‍♀️🍳

## Description

BotSanté est une application de chatbot développée en JavaScript Vanilla, utilisant TailwindCSS pour le design. Ce projet permet d'interagir avec trois bots différents : Nutrition, Exercice et Recette. Chaque bot peut répondre à des commandes spécifiques en utilisant des API pour fournir des informations pertinentes.

## Fonctionnalités

- **Liste des bots** 📋 : Affiche une liste des bots disponibles (Nutrition, Exercice, Recette).
- **Interaction avec les bots** 💬 : Chaque bot répond à des commandes spécifiques.
- **API Intégration** 🌐 : Utilise des API pour obtenir des informations nutritionnelles, des exercices physiques et des recettes.
- **Stockage des messages** 💾 : Utilisation du localStorage pour conserver l'historique des messages.
- **Traduction** 🌍 : Traduction automatique des réponses des API en français.

## Détails des Fichiers

- **index.html** : Le fichier HTML principal qui définit la structure de l'application.
- **main.js** : Fichier JavaScript principal qui gère la logique de l'application.
- **style.css** : Fichier CSS utilisant TailwindCSS pour le style de l'application.
- **/src/assets** : Contient les images utilisées pour les avatars des bots et de l'utilisateur.
- **/src/components** :
  - **Bot.js** : Classe représentant un bot, avec ses actions et ses réponses.
  - **Input.js** : Classe gérant le champ de saisie de message et le bouton d'envoi.
  - **Message.js** : Classe représentant un message dans le chat.
- **/src/utils** :
  - **api.js** : Contient les fonctions pour interagir avec les différentes API.
  - **storage.js** : Gère la sauvegarde et le chargement des messages depuis le localStorage.

## Utilisation

### Commandes Disponibles

#### Nutrition 🍎

- **nutrition** : Obtenez des informations nutritionnelles sur un aliment. Exemple: `nutrition pomme`
- **calories** : Obtenez le nombre de calories d'un aliment. Exemple: `calories banane`
- **nutriments** : Obtenez les nutriments d'un aliment. Exemple: `nutriments orange`

#### Exercice 🏋️‍♀️

- **exercice** : Obtenez des informations sur un exercice. Exemple: `exercice 1`
- **cardio** : Obtenez des informations sur un exercice de cardio. Exemple: `cardio 2`
- **musculation** : Obtenez des informations sur un exercice de musculation. Exemple: `musculation 3`

#### Recette 🍳

- **recette** : Obtenez des informations sur une recette. Exemple: `recette 1`
- **ingrédients** : Obtenez les ingrédients d'une recette. Exemple: `ingrédients 2`
- **étapes** : Obtenez les étapes pour préparer une recette. Exemple: `étapes 3`

### Commandes Globales 🌍

- **aide** : Affiche les commandes disponibles pour le bot actif.
- **diffusion** : Affiche une description pour chaque bot.

### Exécution du Projet 🚀


Pour exécuter ce projet localement, suivez les étapes suivantes :

1. Clonez le repository :
   ```bash
   git clone <URL_DU_REPOSITORY>
   cd <NOM_DU_REPOSITORY>

2. Installez les dépendances :
   ```bash
   npm install

3. Lancez le projet :
   ```bash
   npm run dev

4. Ouvrez votre navigateur et allez à l'adresse  http://localhost:5173/ pour voir l'application en action.


