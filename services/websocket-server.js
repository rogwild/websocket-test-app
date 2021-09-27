const WebSocket = require(`ws`);

class WebSoketServer {
  constructor({ server }) {
    this.create({ server });
  }

  create({ server }) {
    const wss = new WebSocket.Server({ server });

    wss.on(`connection`, async (socket) => {
      console.log(`WebSoketServer socket connection`);

      socket.on("message", async (message) => {
        socket.send(message);
      });

      socket.on("error", (error) => {
        console.log(`WebSoketServer socket error`, error);
      });

      socket.on("close", () => {
        console.log(`WebSoketServer socket close`);
      });
    });

    wss.on(`error`, (error) => {
      strapi.log.info(`WebSocket server error: `, error);
    });

    wss.on(`close`, () => {
      strapi.log.info(`WebSocket server: connection closed`);
    });

    this.server = wss;
  }
}

module.exports = { WebSoketServer };
