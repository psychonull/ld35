var importOnce = require('node-sass-import-once');

var options = {
  style: 'expanded',
  importer: importOnce,
  importOnce: {
    index: false,
    css: true,
    bower: false
  }
};

module.exports = {
  app: {
    options,
    files: {
      "dist/<%= pkg.name %>.css": 'src/index.scss'
    }
  }
};
