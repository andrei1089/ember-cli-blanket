var fs = require('fs');
var path = require('path');


function collectEmberPackageExclusions() {
  var root = path.join(__dirname, '../../');
  var allFilesInNodeModules = fs.readdirSync(root);

  var files = [];

  allFilesInNodeModules.forEach(function(item) {
    if(item.indexOf('.') === 0) {
      return;
    }

    var itemPath = path.join(root, item);

    var fsStats = fs.statSync(itemPath);
    var isDirectory = fsStats.isDirectory();

    if (!isDirectory) {
      return ;
    }

    var packagePath = path.join(itemPath, 'package.json');
    var exists = fs.existsSync(packagePath);

    if (!exists) {
      return ;
    }

    var packageJson = JSON.parse(fs.readFileSync(packagePath, { encoding: 'utf8' }));

    var isEmberAddon = packageJson.keywords && packageJson.keywords.indexOf('ember-addon') >= 0;

    if (!isEmberAddon) {
      return ;
    }

    var appDir = path.join(itemPath, 'app');
    var hasAppDir = fs.existsSync(appDir);

    if (!hasAppDir) {
      return ;
    }

    var filesUnderApp = readdirRecursive(appDir);

    files = files.concat(filesUnderApp);

  });

  files.forEach(function(name, index) {
    var pathExcludedRoot = name.replace(root, '');

    files[index] = pathExcludedRoot.substring(pathExcludedRoot.indexOf('app/') + 4, pathExcludedRoot.lastIndexOf('.'));
  });

  return files;
}

function readdirRecursive(dir, files) {
  files = files || [];

  if (!fs.existsSync(dir)) return;
  if (fs.statSync(dir).isDirectory()) {
    fs.readdirSync(dir)
      .forEach(function (name) {
        if (name.indexOf('.') === 0) {
          return;
        }
        readdirRecursive(path.join(dir,name), files)
      });
  }
  else {
    if(/\.js$/.test(dir)) {
      files.push(dir);
    }
  }


  return files
}

module.exports = {
  findFilesInEmberAddons: collectEmberPackageExclusions
};
