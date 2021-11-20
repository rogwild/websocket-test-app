'use strict'

const tools = require('../tools');
const R = require(`ramda`);
const typeValidator = require('../api/websocket/services/websocket');

class MessageHandler {
  constructor(ws) {
    this.websocket = ws;
    this.userName = "";
  }

  validateMessage(message) {
    const messageObject = tools.tryParse(message);
    if (R.isNil(messageObject)) {
      throw new Error("Passed message should be JSON.parse'able");
    }

    if (!typeValidator.isValidMessageType(messageObject)) {
      throw new Error("Invalid message type");
    }

    strapi.log.info("Done!");
    return messageObject;
  }

  handleMessages() {
    this.websocket.on('message', async (message) => {
      try {
        const messageObject = this.validateMessage(message);

        const response =
          await strapi.controllers.websocket.eventHandler[messageObject.type](this, messageObject);

        await this.websocket.send(JSON.stringify(response));
      }
      catch (e) {
        strapi.log.error(e.message);
        // TODO: send error
        const response = {
          type: "ERROR",
          payload: {
            message: e.message
          }
        }

        await this.websocket.send(JSON.stringify(response));
      }
    });
  }

  setUserName(name) {
    this.userName = name;
  }

}

module.exports = { MessageHandler };