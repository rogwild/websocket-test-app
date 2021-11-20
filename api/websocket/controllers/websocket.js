'use strict'

const axios = require(`axios`);
const tools = require('../../../tools');
const R = require(`ramda`);

const eventHandler = {

  async CONNECT(handler, message) {

    let responseMessage = {};
    try {
      const userName = message.payload.name;

      const user = await strapi.query('subscriber').findOne({ name: userName });

      if (R.isNil(user)) {
        await strapi.query('subscriber').create({ name: userName });
      }
      /*
      user = ...
      if (utils.isEmpty(user)) throw ...
       */
      handler.setUserName(userName);

      responseMessage = {
        type: "CONNECT",
        payload: {
          success: true
        }
      }
    }
    catch (e) {
      responseMessage = {
        type: "ERROR",
        payload: {
          message: e.message
        }
      }
    }

    return responseMessage;
  },

  async GET_DATA(handler, message) {

    let responseMessage = {};

    const symbol = message.payload.symbol;
    try {
      const subscriber = await strapi.query('subscriber').findOne({ name: handler.userName });
      /*
        if (utils.isEmpty(user)) ...
      */
      await strapi.query('request').create({
        type: "GET_DATA",
        symbol: symbol,
        subscriber: subscriber
      });

      await axios.get(`https://api.coingecko.com/api/v3/coins/${symbol}`, { })
        .then((response) => {
          responseMessage = {
            type: "GET_DATA",
            payload: response.data
          };
        })
        .catch((error) => {
          strapi.log.error(`${error}`);
          responseMessage = {
            type: "ERROR",
            payload: {
              message: error
            }
          }
        })
        .then();
    }
    catch (e) {
      responseMessage = {
        type: "ERROR",
        payload: {
          message: e
        }
      }
    }

    return responseMessage;
  },

  async HISTORY(handler, message) {

    let response = {};
    try {
      const subscriber = strapi.query('subscriber').findOne({name: handler.userName});

      if (!tools.isEmpty(subscriber))
        response = {
          type: "HISTORY",
          payload: subscriber.requests
        }
      else
        response = {
          type: "ERROR",
          payload: {
            message: "Can't find the user in HISTORY-controller"
          }
        }
    }
    catch (e) {
      response = {
        type: "ERROR",
        payload: {
          message: e
        }
      }
    }

    return response;
  }

}

eventHandler.eventTypes = Object.keys(eventHandler);

module.exports = { eventHandler };