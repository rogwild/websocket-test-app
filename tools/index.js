'use strict'

module.exports = {

    isJson(message) {
      try {
        const messageObj = JSON.parse(message);
        return messageObj && typeof messageObj == "object";
      }
      catch (e) { }
  
      return false;
    },
  
    tryParse(message) {
      try {
        const messageObj = JSON.parse(message);
        if (messageObj && typeof messageObj == "object")
          return messageObj;
      }
      catch (e) { }
  
      return null;
    },
  
    isEmpty(obj) {
      return (obj
        && Object.keys(obj).length === 0
        && Object.isPrototypeOf(obj) === Object.prototype)
        ?? true;
    }
  
  }