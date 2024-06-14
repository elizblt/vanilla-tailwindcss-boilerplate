class Input {
  constructor(onSend) {
    this.onSend = onSend;
  }

  render() {
    // Crée le conteneur pour l'input
    const inputContainer = document.createElement('div');
    inputContainer.className = 'input-container flex mt-4';

    // Crée le champ de saisie de message
    const inputField = document.createElement('input');
    inputField.className = 'flex-1 p-2 border rounded-l-md mr-2';
    inputField.setAttribute('placeholder', 'Écrire un message...');

    // Crée le bouton d'envoi
    const sendButton = document.createElement('button');
    sendButton.className = 'p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600';
    sendButton.innerText = 'Envoyer';

    // Ajoute l'événement click pour envoyer le message
    sendButton.addEventListener('click', () => {
      this.onSend(inputField.value);
      inputField.value = '';  // Réinitialise le champ de saisie
    });

    // Ajoute l'événement keypress pour envoyer le message avec "Enter"
    inputField.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        this.onSend(inputField.value);
        inputField.value = '';  // Réinitialise le champ de saisie
      }
    });

    // Ajoute le champ de saisie et le bouton au conteneur
    inputContainer.appendChild(inputField);
    inputContainer.appendChild(sendButton);

    return inputContainer;
  }
}
  
export default Input;
  