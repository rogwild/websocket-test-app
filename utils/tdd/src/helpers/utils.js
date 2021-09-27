const undefinedToNull = (x) =>
  Object.keys(x).reduce((p, c) => {
    p[c] = x[c] || null;
    return p;
  }, {});

const nullToUndefined = (x) =>
  Object.keys(x).reduce((p, c) => {
    p[c] = x[c] || undefined;
    return p;
  }, {});

module.exports = { undefinedToNull, nullToUndefined };
