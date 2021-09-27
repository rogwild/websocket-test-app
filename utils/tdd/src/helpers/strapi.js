const server = require(`../server.js`);
const axios = require(`axios`);

let instance;

/**
 * Create an `strapi` instance
 */
const setupStrapi = async () => {
  if (!instance) {
    await server.createStrapi();
    instance = strapi;
  }

  return instance;
};

/**
 * Create a `HTTP` server only if it doesn't exist
 */
const createHttpServer = async (apiUrl = `http://localhost:1337`) => {
  // await new Promise((resolve) => {
  //   const ti = setInterval(async () => {
  //     await axios(apiUrl)
  //       .then(() => {})
  //       .catch(async (error) => {
  //         if (error.code === `ECONNREFUSED`) {
  //           await server.createHttpServer();
  //           // console.log("axios error", error);
  //           clearInterval(ti);
  //           resolve();
  //         }
  //       });
  //   }, 500);
  // });

  try {
    await axios(apiUrl)
      .then(async () => {
        console.log(`server already started`);
      })
      .catch(async (error) => {
        console.log("createHttpServer error", error);
        if (error.code === `ECONNREFUSED`) {
          await server.createHttpServer();
          // console.log("axios error", error);
        }
      });
  } catch (error) {}

  await new Promise((resolve) => {
    const tm = setInterval(async () => {
      await axios(apiUrl)
        .then(async () => {
          resolve();
          console.log("strapi started");
          clearInterval(tm);
        })
        .catch((error) => {
          console.log("strapi is starting ...");
        });
    }, 500);
  });

  let wrorkingTimer = setTimeout(async () => {
    await stopHttpServer();
    clearTimeout(wrorkingTimer);
  }, 100000);

  console.log(`🚀 ~ wrorkingTimer ~ wrorkingTimer`, wrorkingTimer);

  return stopHttpServer;
};

/**
 * Остановить сервер только в случае если он был создан
 */
const stopHttpServer = async () => {
  if (instance) {
    await server.stopHttpServer();
  }
};

const getJwt = async (user, host = `http://localhost:1337`) => {
  const { identifier, password } = user;
  const loginRes = await axios(`${host}/auth/local`, {
    method: `POST`,
    headers: {
      "Content-Type": `application/json`,
    },
    body: JSON.stringify({
      identifier,
      password,
    }),
  })
    .then((res) => {
      return res.json(); //?
    })
    .catch((error) => {
      console.log(`loginUser error`, error);
    });

  return strapi.plugins[`users-permissions`].services.jwt.issue({
    id: loginRes.user.id,
    email: loginRes.user.email,
    username: loginRes.user.username,
  }); //?
};

// (async () => await setupStrapi())();

module.exports = { setupStrapi, createHttpServer, getJwt };
