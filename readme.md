Bunyan Logger for Restify
=========================

Add bunyan logging to your restify app.

## Installation
```
npm install restify-bunyan-logger
```

Use `--save` to add the package to your current package.json.

## Usage
Basic usage is one line:

```js
var restifyBunyanLogger = require('restify-bunyan-logger');
server.on('after', restifyBunyanLogger());
```

### Parameters
`restifyBunyanLogger` takes an option parameter. Valid keys are:

* `skip`: function to skip some logs. Take as parameters req and res, must return true to skip the logging of this request.
* `custom`: function to add custom values to the bunyan log. Take as parameters req, res, route, err, log (a pre defined log object). Must return a Javascript object.

```js
server.on('after', restifyBunyanLogger({
  skip: function(req, res) {
    return req.method === "OPTIONS";
  },
  custom: function(req, res, route, err) {
    // This will not work when using gzip.
    log.res.length = res.get('Content-Length');

    // Don't forget to return!
    return log;
  }
}));
```

## More...
This package fits nicely with the default restify bunyan implementation, and will use any custom logger you want.
You may want to add `server.use(restify.requestLogger());` to get a unique request identifier on each log.
