"use strict";
var _ = require('underscore');


// Who want ERB? (not me)
// Let's go for mustache style parsing!
_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};


var template = "{{ _time.toTimeString().substr(0, 8) }} {{ cS('underline') }}{{ name }}{{ cE('underline')}} {{ cS('grey') }}{{ req.method }} {{ req.user || '???' }} {{ req.url }}{{ cE('grey') }} {{ cS(res.status >= 500 ? 'red' : res.status >= 400 ? 'yellow' : res.status >= 300 ? 'cyan' : 'green')}}{{ res.status }}{{ cE('green') }} {{ cS(res.time > 800 ? 'bold': 'grey')}}{{ res.time }}ms{{ cE(res.time > 800 ? 'bold': 'grey') }} {{ cS('underline') }}{{ res.restCode }}{{ cE('underline')}} {{ msg }}";

var compiledTemplate = _.template(template);


module.exports = function(rec, line, startStylizeWithColor, endStylizeWithColor, emit) {
  // color start function
  rec.cS = startStylizeWithColor;
  // color end function
  rec.cE = endStylizeWithColor;

  rec._time = new Date(rec.time);

  var out;
  try {
    out = compiledTemplate(rec);
  }
  catch(e) {
    out = line;
  }

  emit(out + "\n");
};
