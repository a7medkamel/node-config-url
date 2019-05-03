var _       = require('lodash')
  , { URL } = require('url')
  ;

function get_url(key) {
  let config = require('config');

  if (config.has(key)) {
    let obj = config.get(key);

    if (_.isString(obj)) {
      return new URL(obj);
    }

    if (_.isObject(obj)) {
      let { url } = obj;

      if (url) {
        return new URL(url);
      }

      return _.assign(new URL("https://localhost"), obj);
    }
  }

  return config.get(key);
}

module.exports = {
  url : get_url
};