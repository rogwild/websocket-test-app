"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  //   async create(ctx) {
  //     let entity;
  //     if (ctx.is("multipart")) {
  //       const { data, files } = parseMultipartData(ctx);
  //       entity = await strapi.services.subscriber.create(data, { files });
  //     } else {
  //       entity = await strapi.services.subscriber.create(ctx.request.body);
  //     }
  //     return sanitizeEntity(entity, { model: strapi.models.subscriber });
  //   },

  async createByWebSocket(ctx) {
    ctx; //?
    return {};
  },
};
