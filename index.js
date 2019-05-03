var _       = require('lodash')
  , { URL } = require('url')
  ;

function is_primitive(i) {
  return _.isNumber(i) || (_.isString(i) && !_.isEmpty(i));
}

function get_url(key, defaults = {}) {
  let config = require('config');

  if (config.has(key)) {
    let obj = config.get(key);

    if (_.isString(obj)) {
      return new URL(obj);
    }

    if (_.isObject(obj)) {
      obj = _.chain({}).defaults(obj, defaults).pickBy(is_primitive).value();

      let { url } = obj;

      if (url) {
        return new URL(url);
      }

      let { protocol = 'https:' } = obj;
      return _.assign(new URL(`${protocol}//localhost`), obj);
    }
  }

  return config.get(key);
}

module.exports = {
  url : get_url
};