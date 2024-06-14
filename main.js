import './style.css';
import Bot from './src/components/Bot';
import Message from './src/components/Message';
import { fetchSportData, fetchCaloriesInfo, fetchNutrientsInfo, fetchCardioInfo, fetchStrengthInfo, fetchRecipeIngredients, fetchRecipeSteps } from './src/utils/api';
import { saveMessages, loadMessages } from './src/utils/storage';

document.addEventListener('DOMContentLoaded', () => {

  // Sélection des éléments DOM
  const chatContainer = document.getElementById('chat-container');
  const messageInput = document.getElementById('messageInput');
  const sendButton = document.getElementById('sendButton');
  const toggleSidebarButton = document.getElementById('toggleSidebar');
  const sidebar = document.getElementById('sidebar');
  const botList = document.getElementById('botList');
  const activeBotName = document.getElementById('activeBotName');
  const commandList = document.getElementById('commandList');
  const clearHistoryButton = document.getElementById('clearHistory');
  const helpButton = document.getElementById('helpButton');
  const diffusionButton = document.getElementById('diffusionButton');
  const emptyState = document.getElementById('emptyState');

  const avatars = {
    User: './src/assets/user.png',
    Nutrition: './src/assets/nutrition.png',
    Exercice: './src/assets/exercise.png',
    Recette: './src/assets/recipe.png'
  };

  let messages = loadMessages();
  let activeBot = localStorage.getItem('activeBot') || 'Nutrition';

  const bots = [
    new Bot('Nutrition', [
      { trigger: 'nutrition', response: async (message) => await fetchSportData(message, 'Nutrition'), description: 'Obtenez des informations nutritionnelles sur un aliment. Exemple: nutrition pomme' },
      { trigger: 'calories', response: async (message) => await fetchCaloriesInfo(message), description: 'Obtenez le nombre de calories d\'un aliment. Exemple: calories banane' },
      { trigger: 'nutriments', response: async (message) => await fetchNutrientsInfo(message), description: 'Obtenez les nutriments d\'un aliment. Exemple: nutriments orange' }
    ], avatars.Nutrition, 'Je suis le bot Nutrition. Je peux vous fournir des informations nutritionnelles.'),
    new Bot('Exercice', [
      { trigger: 'exercice', response: async (message) => await fetchSportData(message, 'Exercice'), description: 'Obtenez des informations sur un exercice. Exemple: exercice 1' },
      { trigger: 'cardio', response: async (message) => await fetchCardioInfo(message), description: 'Obtenez des informations sur un exercice de cardio. Exemple: cardio 2' },
      { trigger: 'musculation', response: async (message) => await fetchStrengthInfo(message), description: 'Obtenez des informations sur un exercice de musculation. Exemple: musculation 3' }
    ], avatars.Exercice, 'Je suis le bot Exercice. Je peux vous fournir des informations sur les exercices physiques.'),
    new Bot('Recette', [
      { trigger: 'recette', response: async (message) => await fetchSportData(message, 'Recette'), description: 'Obtenez des informations sur une recette. Exemple: recette 1' },
      { trigger: 'ingrédients', response: async (message) => await fetchRecipeIngredients(message), description: 'Obtenez les ingrédients d\'une recette. Exemple: ingrédients 2' },
      { trigger: 'étapes', response: async (message) => await fetchRecipeSteps(message), description: 'Obtenez les étapes pour préparer une recette. Exemple: étapes 3' }
    ], avatars.Recette, 'Je suis le bot Recette. Je peux vous fournir des recettes et des informations sur la cuisine.')
  ];

  const renderMessages = () => {
    chatContainer.innerHTML = '';
    if (messages.length === 0) {
      emptyState.classList.remove('hidden');
      emptyState.style.display = 'flex';
    } else {
      emptyState.classList.add('hidden');
      emptyState.style.display = 'none';
      messages.forEach(msg => {
        const message = new Message(msg.sender, msg.text, avatars[msg.sender], msg.timestamp);
        chatContainer.appendChild(message.render());
      });
      chatContainer.scrollTop = chatContainer.scrollHeight;  // Défile jusqu'au dernier message
    }
  };

  const setActiveBot = (botName) => {
    console.log('Définition du bot actif sur:', botName);
    activeBot = botName;
    localStorage.setItem('activeBot', activeBot);
    activeBotName.textContent = botName.charAt(0).toUpperCase() + botName.slice(1);
    renderCommands();
    document.querySelectorAll('.bot-item').forEach(item => item.classList.remove('active'));
    document.querySelector(`.bot-item[data-bot="${botName.toLowerCase()}"]`).classList.add('active');
    renderMessages();
  };

  const renderCommands = () => {
    const bot = bots.find(bot => bot.name.toLowerCase() === activeBot.toLowerCase());
    commandList.innerHTML = '';
    bot.actions.forEach(action => {
      const commandItem = document.createElement('li');
      commandItem.className = 'p-2 mb-2 bg-gray-200 text-gray-600 rounded-xl';
      commandItem.innerHTML = `<span class="block">${action.trigger.charAt(0).toUpperCase() + action.trigger.slice(1)}</span><span class="text-xs text-gray-400">${action.description}</span>`;
      commandList.appendChild(commandItem);
    });
  };

  const sendMessage = async (text = null) => {
    const messageText = text || messageInput.value.trim();
    if (!messageText) return;

    console.log('Envoi du message:', messageText);
    const userMessage = new Message('User', messageText, avatars.User);
    messages.push(userMessage);
    saveMessages(messages);
    renderMessages();

    let responses = [];

    if (messageText.toLowerCase() === 'diffusion') {
      for (let bot of bots) {
        responses.push(Promise.resolve(new Message(bot.name, bot.description, avatars[bot.name])));
      }
    } else if (messageText.toLowerCase() === 'aide') {
      const bot = bots.find(bot => bot.name.toLowerCase() === activeBot.toLowerCase());
      const helpResponse = `Commandes disponibles: ${bot.actions.map(action => action.trigger).join(', ')}`;
      responses.push(Promise.resolve(new Message(bot.name, helpResponse, avatars[bot.name])));
    } else {
      const bot = bots.find(bot => bot.name.toLowerCase() === activeBot.toLowerCase());
      responses.push(bot.getResponse(messageText).then(response => new Message(bot.name, response, avatars[bot.name])));
    }

    for (const responsePromise of responses) {
      const response = await responsePromise;
      messages.push(response);
    }

    saveMessages(messages);
    renderMessages();

    messageInput.value = '';
  };

  sendButton.addEventListener('click', () => sendMessage());
  messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  });

  toggleSidebarButton.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
  });

  botList.addEventListener('click', (event) => {
    const botItem = event.target.closest('.bot-item');
    if (botItem) {
      setActiveBot(botItem.dataset.bot);
    }
  });

  clearHistoryButton.addEventListener('click', () => {
    if (confirm('Êtes-vous sûr de vouloir vider l\'historique des messages ?')) {
      messages = [];
      saveMessages(messages);
      renderMessages();
    }
  });

  helpButton.addEventListener('click', () => {
    sendMessage('aide');
  });

  diffusionButton.addEventListener('click', () => {
    sendMessage('diffusion');
  });

  setActiveBot(activeBot);
});
