"use strict";
var _ = require('underscore');


// Who want ERB? (not me)
// Let's go for mustache style parsing!
_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};


var template = "{{ req.method }} {{ req.user || '???' }} {{ req.url }} {{ res.status }} {{ res.time }}ms {{ res.restCode }} {{ msg }}";

var compiledTemplate = _.template(template);


module.exports = function(rec, stylize, emit) {
  emit(compiledTemplate(rec) + "\n");
};
