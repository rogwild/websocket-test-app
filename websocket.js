const WebSocket = require(`ws`);
const fetch = require(`node-fetch`);
const R = require(`ramda`);

const wsCreateServer = async ({
  host = `localhost`,
  port = `1337`,
  endpoints,
  stayOpen = true,
  onConnection = () => {},
}) => {
  const wss = new WebSocket.Server({ host, port });
  console.log(`message`);

  wss.on(`connection`, (socket) => {
    onConnection();
    socket.on(`message`, (message) => {
      console.log(`🚀 ~ socket.on ~ message`, message);

      if (endpoints) {
        try {
          let messageObject = JSON.parse(message);

          for (endpoint of endpoints) {
            if (R.equals(messageObject, JSON.parse(endpoint.request))) {
              socket.send(endpoint.response);
              if (!stayOpen) {
                socket.close();
                wss.close();
              }
            } else {
              socket.send(
                JSON.socket({ type: `ERROR`, message: `Wrong message` })
              );
              wss.close();
            }
          }
        } catch (error) {
          const message = JSON.stringify({
            type: `ERROR`,
            message: error.message,
          });

          socket.send(message);
        }
      }
    });
  });

  wss.on(`error`, (error) => {
    console.log(`WebSocket server error: `, error);
  });

  wss.on(`close`, () => {
    console.log(`WebSocket server: connection closed`);
  });

  return async () => await closeWsServer({ host, port });
};

async function closeWsServer({ host = `localhost`, port = `1337` }) {
  const endpoint = `${host}:${port}`;

  await fetch(`http://${endpoint}`)
    .then(() => {
      wsCreateAndSendMessage(
        JSON.stringify({ type: `STOP` }),
        `ws://${endpoint}`
      )
        .then(() => {
          ({ res, socket }) => {
            socket.close();
            return res;
          };
        })
        .catch((error) => {
          // console.log(`closeWsServer error`, error);
        });
    })
    .catch((error) => {
      // error;
    });

  await new Promise((resolve) => {
    const tm = setTimeout(async () => {
      await fetch(endpoint)
        .then((res) => {
          res; //?
        })
        .catch((error) => {
          error;
        });
      clearTimeout(tm);
      resolve();
    }, 500);
  });
}

/**
 * Creating a `WebSocket` client and sending a message to `host`
 *
 * @param {string} message - the message sent through the created `WebSocket` server
 * @returns {string} response from server
 */
const wsCreateAndSendMessage = (
  message,
  host = `ws://localhost:1337`,
  timeout
) =>
  new Promise(async (resolve, reject) => {
    const socket = new WebSocket(host);
    const messages = [];

    socket.on(`open`, () => {
      socket.send(message);

      socket.on(`message`, async (message) => {
        if (timeout) {
          messages.push(message);
        } else {
          resolve({ socket, res: message });
        }
      });

      socket.on(`error`, (error) => {
        reject({ res: error, socket });
      });
    });
    if (timeout) {
      await new Promise((resolvePromise) => {
        const tm = setTimeout(() => {
          clearTimeout(tm);
          resolve({ socket, res: messages });
          resolvePromise();
        }, timeout);
      });
    }
  });

async function waitForResponse(cb, timeout = 200) {
  return await new Promise((resolve) => {
    const tm = setTimeout(async () => {
      cb();
      clearTimeout(tm);
      resolve();
    }, timeout);
  });
}

module.exports = {
  waitForResponse,
  closeWsServer,
  wsCreateServer,
  wsCreateAndSendMessage,
};
