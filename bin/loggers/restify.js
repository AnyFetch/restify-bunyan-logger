"use strict";
var util = require('util');


module.exports = function(rec, stylize, emit) {
  if(!rec.req || !rec.res) {
    return emit(JSON.stringify(rec) + "\n");
  }

  // Base
  var line = stylize(util.format('%s %s:%s', rec.req.method, (rec.req.user || "???"), rec.req.url), 'grey');

  // Status code
  var statusColor = 'green';
  if(rec.res.status >= 500) {
    statusColor = 'red';
  }
  else if(rec.res.status >= 400) {
    statusColor = 'yellow';
  }
  else if(rec.res.status >= 300) {
    statusColor = 'cyan';
  }

  line += " " + stylize(rec.res.status, statusColor);

  if(rec.res.time < 30) {
    line += " " + stylize(rec.res.time + "ms", "grey");
  }
  else {
    line += " " + stylize(rec.res.time + "ms", "bold");
  }

  if(rec.res.restCode) {
    line += " " + stylize(rec.res.restCode, 'underline');
  }
  if(rec.msg) {
    line += " " + stylize(rec.msg, '');
  }
  emit(line + "\n");
};
