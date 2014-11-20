Bunyan Logger for Restify
=========================

Add bunyan logging to your restify app.

## Installation
```
npm install restify-bunyan-logger
```

Use `--save` to add to your current package.json.

## Usage
Basic usage is one line:

```js
var restifyBunyanLogger = require('restify-bunyan-logger')
server.use(restifyBunyanLogger());
```

### Parameters
`restifyBunyanLogger` takes up to two parameters:

* `skip`: function to skip some logs. Take as parameters req and res, must return true to skip the logging of this request.
* `custom`: function to add custom values to the bunyan log. Take as parameters req, res, route, err, log (a pre defined log object). Must return a Javascript object.


