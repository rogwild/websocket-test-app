const Strapi = require(`strapi`);
const axios = require(`axios`);

let strapi;

/**
 * Create an instance of `strapi`. Doesn't start the `HTTP` server, it just adds `strapi` to the global scope so that it can be accessed and methods called
 */
const createStrapi = async () => {
  try {
    if (strapi) {
      return;
    }
    strapi = await Strapi().load();
  } catch (error) {
    console.error("createStrapi error", error);
  }
  // return strapi
};

/**
 * Create an HTTP server based on a strapi instance
 */
const createHttpServer = async () => {
  try {
    if (strapi) {
      await strapi.start();
      return;
    }
    createStrapi();
    await Strapi().start();
  } catch (error) {
    console.error("createHttpServer error", error);
  }
};

/**
 * Stop the `HTTP` server for tests to run independently
 */
const stopHttpServer = async (apiUrl = "http://localhost:1337") => {
  try {
    await axios(apiUrl)
      .then(async (res) => {
        if (res) {
          // console.log(strapi);
          await strapi.destroy();
        }
      })
      .catch(async (error) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createStrapi,
  createHttpServer,
  stopHttpServer,
};
