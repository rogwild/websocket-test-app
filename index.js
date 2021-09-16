const { wsCreateServer } = require(`./websocket`);

const endpoints = [{ request: JSON.stringify({ type: `CONNECT` }) }];

(async () => {
  await wsCreateServer({ endpoints });
})();
