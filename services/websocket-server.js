'use strict'

const WebSocket = require(`ws`);
const { MessageHandler } = require("./message-handler");


class WebSoketServer {
  constructor({ server }) {
    this.create({ server });
  }

  create({ server }) {
    const wss = new WebSocket.Server({ server });
    
    // get coins list from coingecko
    axios.get({

    })
    .then()
    .catch()
    .then();

    wss.on('connection', async (ws) => {
      strapi.log.info('New connection');

      ws.on('message', async (data) => {
        strapi.log.info(`Message received: ${data}`);
      });

      this.messageHandler = new MessageHandler(ws);
      this.messageHandler.handleMessages();
    });

    wss.on('listening', async () => {
      strapi.log.info(`WebSocket server is running on port: ${wss.address().port}`);
    });

    wss.on('error', async () => {
      strapi.log.error('WebSocket error: ');
    });

    wss.on('close', async () => {
      strapi.log.info('WebSocket closed: ');
    });

    this.server = wss;
  }
}

module.exports = { WebSoketServer };
