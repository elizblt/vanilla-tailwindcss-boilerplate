class Message {
  constructor(sender, text, avatar, timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })) {
    this.sender = sender;
    this.text = text;
    this.avatar = avatar;
    this.timestamp = timestamp;
  }

  render() {
    // Crée l'élément du message
    const messageElement = document.createElement('div');
    messageElement.className = `message ${this.sender === 'User' ? 'User justify-end' : 'Bot justify-start'} flex items-end mb-4`;

    // Crée le contenu du message
    const contentElement = document.createElement('div');
    contentElement.className = `content p-4 rounded-2xl max-w-xs ${
      this.sender === 'User' ? 'bg-blue-500 text-white ml-2' : 'bg-gray-200 text-black mr-2'
    }`;

    // Crée l'en-tête du message
    const headerElement = document.createElement('div');
    headerElement.className = 'header flex justify-between items-center mb-1';
    headerElement.innerHTML = `<span class="name font-bold">${this.sender}</span><span class="timestamp text-xs ${this.sender === 'User' ? 'text-white ml-2' : 'text-black'}">${this.timestamp}</span>`;

    // Crée le texte du message
    const textElement = document.createElement('div');
    textElement.className = 'text';
    textElement.innerHTML = this.text;

    // Crée l'avatar de l'expéditeur
    const avatarElement = document.createElement('img');
    avatarElement.src = this.avatar;
    avatarElement.alt = `${this.sender} Avatar`;
    avatarElement.className = 'avatar w-10 h-10 rounded-full';

    // Ajoute l'en-tête et le texte au contenu
    contentElement.appendChild(headerElement);
    contentElement.appendChild(textElement);

    // Ajoute l'avatar et le contenu au message selon l'expéditeur
    if (this.sender !== 'User') {
      messageElement.appendChild(avatarElement);
      messageElement.appendChild(contentElement);
    } else {
      messageElement.appendChild(contentElement);
      messageElement.appendChild(avatarElement);
    }

    return messageElement;
  }
}

export default Message;
