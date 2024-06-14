class Bot {
  constructor(name, actions, avatar, description) {
    this.name = name;
    this.actions = actions;
    this.avatar = avatar;
    this.description = description;
  }

  async getResponse(message) {
    message = message.toLowerCase().trim();
    const action = this.actions.find(action => message.includes(action.trigger));
    if (action) {
      if (typeof action.response === 'function') {
        return await action.response(message);
      } else {
        return action.response;
      }
    } else {
      return "Je ne comprends pas cette commande. Pour de l'aide, tapez \"aide\".";
    }
  }
}

export default Bot;
