/*globals blanket, module */

var options = {
  modulePrefix: "<%= dasherizedPackageName %>",
  filter: "//.*<%= dasherizedPackageName %>/.*/",
  antifilter: "//.*(tests|template).*/",
  loaderExclusions: [],
  enableCoverage: true,
  includeSourceInReport: false,
  cliOptions: {
    reporters: ['json']
  }
};
if (typeof exports === 'undefined') {
  blanket.options(options);
} else {
  module.exports = options;
}
