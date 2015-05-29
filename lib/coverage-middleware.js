var optionUtils = require('./blanket-options');
var path = require('path');

function reporterForName(reporterName) {
  return require(path.join(__dirname, 'reporters', reporterName + '-reporter'));
}

// TODO handle multiple reporters
function loadReporter(blanketOptions) {
  var reporterName = blanketOptions.cliOptions.reporters[0] || 'null';

  var OutputReporter = reporterForName(reporterName);
  var reporter = new OutputReporter(blanketOptions);
  return reporter;
}

module.exports = function(options) {


  var blanketOptions = optionUtils.loadBlanketOptions(options);
  var reporter = loadReporter(blanketOptions);

  return function(req, res, next) {
    // TODO: optionize url
    if (req.method === 'POST' && req.url === '/write-blanket-coverage') {
      reporter.report(req.body);
      res.status(200).send('all good');
    } else {
      next();
    }
  };
};
