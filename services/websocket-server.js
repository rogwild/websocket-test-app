const axios = require("axios");
const WebSocket = require(`ws`);

class WebSoketServer {
  constructor({ server }) {
    this.create({ server });
  }

  create({ server }) {
    // const wss = new WebSocket.Server({ server });
  }
}

module.exports = { WebSoketServer };
