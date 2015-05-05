/*global blanket */
(function() {
  //TODO: Refactor/cleanup
  blanket.customReporter = function(coverageData) {
    var fileCoverage = [];
    // This joy brought to you by pushing addl properties onto array elements
    for (var x in coverageData.files) {
      var fileData = coverageData.files[x];
      var options = {
        fileName: x,
        lines: fileData,
        branchData: fileData.branchData
      };

      if (blanket.options('includeSourceInReport')) { // include source if specified.
        options.source = fileData.source
      }

      fileCoverage.push(options);
    }
    // Create our own data structure to insulate from blanket's internals
    window._$blanket_coverageData = {
      fileData: fileCoverage,
      stats: coverageData.stats
    };
    // Call the standard reporter well to get inline data (assuming you're running in browser)
    blanket.defaultReporter(coverageData);
  };

})();
