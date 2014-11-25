"use strict";


/**
 * Log restify request on bunyan.
 *
 * @param skip: function to skip some logs. Take as parameters req and res, must return true to skip the logging of this request.
 * @param custom: function to add custom values to the bunyan log. Take as parameter req, res, route, err, log (a pre defined log object). Must return a Javascript object.
 */
module.exports = function(options) {
  if(!options) {
    options = {};
  }

  return function(req, res, route, err) {
    if(options.skip && options.skip(req, res)) {
      return;
    }

    var logger = options.logger || req.log;

    var reqLog = {
      method: req.method,
      url: req.url,
      route: route ? route.spec.path : undefined, // Can be empty when no route matches
    };
    if(req.user) {
      reqLog.user = req.user.email;
    }

    var resLog = {
      status: res.statusCode,
      time: Date.now() - req.time()
    };
    if(res.statusCode >= 400 && err && err.restCode) {
      resLog.restCode = err.restCode;
    }

    var log = {
      req: reqLog,
      res: resLog
    };

    if(options.custom) {
      log = options.custom(req, res, route, err, log);
    }

    if(res.statusCode >= 500) {
      logger.error(log, err && err.message ? err.message : err);
    }
    else if(res.statusCode >= 400) {
      logger.warn(log, err && err.message ? err.message : err);
    }
    else {
      logger.info(log);
    }
  };
};
