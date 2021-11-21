"use strict";

const { WebSoketServer } = require("../../services/websocket-server");
const { MessageHandler } = require("../../services/message-handler");

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/v3.x/concepts/configurations.html#bootstrap
 */

module.exports = async () => {
  try {
    const WSServer = new WebSoketServer();
    await WSServer.create({ server: strapi.server });
  } catch (err) {
    console.error(err);
  }
};
