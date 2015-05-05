'use strict';

var fs = require('fs-extra');
var path = require('path');

function exists(path) {
  return fs.existsSync(path);
}

function isCurrentFormat(path) {
  if (exists(path)) {
    var contents = fs.readFileSync(path, 'utf8');
    return contents.match(/module.exports/) !== null;
  }
  throw new Error('blanket options file at ' + path + ' does not exist');
}

function loadBlanketOptions(options) {
  var blanketOptions = null;
  var optionsPath = path.join(options.root, 'tests', 'blanket-options');
  try {
    blanketOptions = require(optionsPath);
  } catch (error) {
    if (!isCurrentFormat(optionsPath + '.js')) {
      throw new Error('blanket-options file is in old format - upgrade using `ember g ember-cli-blanket');
    }
  }
  return blanketOptions;
}

module.exports = {
  exists: exists,
  isCurrentFormat: isCurrentFormat,
  loadBlanketOptions: loadBlanketOptions
};
