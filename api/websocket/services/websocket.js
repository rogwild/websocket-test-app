'use strict'

const controller = require('../controllers/websocket');

module.exports = {

  isValidMessageType(messageObject) {
    return controller.eventHandler.eventTypes.includes(messageObject.type);
  }

}
