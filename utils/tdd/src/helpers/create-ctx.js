module.exports = ({ publicKey, secretKey, params, query, methods }) => {
  const ctx = {
    headers: {
      "content-type": "application/json",
    },
    request: {
      body: {},
    },
    params: {},
  };
  if (publicKey) {
    ctx.headers["public-key"] = publicKey;
  }
  if (secretKey) {
    ctx.headers["secret-key"] = secretKey;
  }
  if (params) {
    ctx.params = { ...params };
  }
  if (query) {
    ctx.query = { ...query };
  }
  if (methods) {
    Object.entries(methods).map((entry) => {
      ctx[entry[0]] = entry[1];
    });
  }

  return ctx;
};
