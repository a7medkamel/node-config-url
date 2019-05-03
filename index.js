var _       = require('lodash')
  , url     = require('url')
  ;

function get_url(key) {
  let config = require('config');

  if (config.has(key)) {
    var obj = config.get(key);

    if (_.isString(obj)) {
      return new URL(obj);
    }

    if (_.isObject(obj)) {
      let { url } = obj;

      if (url) {
        return new URL(url);
      }

      return _.assign(new URL("https://localhost"), obj);

      // if (ret.hostname || ret.port || ret.protocol) {
      //   return url.format({
      //       hostname  : ret.hostname || 'localhost'
      //     , port      : ret.port
      //     , protocol  : ret.protocol || 'http:'
      //   });
      // }
    }
  }

  return config.get(key);
}

module.exports = {
  url : get_url
};