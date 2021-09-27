const tdd = require("../utils/tdd/index");

beforeAll(async () => {
  await tdd.setupStrapi();
  await tdd.createHttpServer();
});

describe(`WebSocket`, () => {
  describe(`Валидаторы`, () => {
    it(`должен отправлять сообщение с ошибкой, если передано сообщение не в формате JSON`, async () => {
      strapi; //?

      const message = `wrong message`;
      const { res: response } = await tdd.wsCreateAndSendMessage(message); //?

      const result = JSON.parse(response);
      expect(result.type).toEqual(`ERROR`);
      expect(result.payload.message).toEqual(
        `Passed message should be JSON.parse'able`
      );
    });
  });

  describe(`CONNECT`, () => {
    it(`должен добавлять пользователя в БД и отправлять сообщение о успешности подключения, если пользователь не был подключался до этого`, async () => {
      const message = JSON.stringify({
        type: "CONNECT",
        payload: {
          name: `User#${parseInt(Math.random() * 10000)}`,
        },
      }); //?

      const spyToDbQuerySubscriberCreate = jest.spyOn(
        strapi.db.query("subscriber"),
        "create"
      );

      const { res: response } = await tdd.wsCreateAndSendMessage(message); //?

      const result = JSON.parse(response);
      expect(result.type).toEqual(`CONNECT`);
      expect(result.payload.success).toEqual(true);
      expect(spyToDbQuerySubscriberCreate).toHaveBeenCalled();
    });

    it("должен брать пользователя из БД, если он уже был добавлен", async () => {
      const message = JSON.stringify({
        type: "CONNECT",
        payload: {
          name: `User#${parseInt(Math.random() * 10000)}`,
        },
      }); //?

      // Создать пользователя впервые
      await tdd.wsCreateAndSendMessage(message);

      const spyToDbQuerySubscriberCreate = jest.spyOn(
        strapi.db.query("subscriber"),
        "create"
      );

      const spyToDbQuerySubscriberFind = jest.spyOn(
        strapi.db.query("subscriber"),
        "find"
      );

      // Подключить существующего пользователя
      const { res: response } = await tdd.wsCreateAndSendMessage(message); //?

      const result = JSON.parse(response);
      expect(result.type).toEqual(`CONNECT`);
      expect(result.payload.success).toEqual(true);
      expect(spyToDbQuerySubscriberFind).toHaveBeenCalled();
      expect(spyToDbQuerySubscriberCreate).not.toHaveBeenCalled();
    });
  });
});
