// Sauvegarde les messages dans le localStorage
export const saveMessages = (messages) => {
  localStorage.setItem('messages', JSON.stringify(messages));
};

// Charge les messages depuis le localStorage
export const loadMessages = () => {
  const messages = localStorage.getItem('messages');
  return messages ? JSON.parse(messages) : [];
};
