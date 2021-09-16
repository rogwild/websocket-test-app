const { wsCreateAndSendMessage, waitForResponse } = require(`./websocket`);

describe(`WebSocket`, () => {
  describe(`Validate Data`, () => {
    it(`should send error message, if sended message not JSON parseable`, async () => {
      const resMessage = await wsCreateAndSendMessage({
        message: `wrong message`,
      }); //?

      const res = JSON.parse(resMessage);
      expect(res.type).toEqual(`ERROR`);
      console.log(`message`);
    });
  });
});
