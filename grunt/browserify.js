
var options = {
  //banner: "<%= banner %>",
  browserifyOptions: {
    debug: true
  },
  debug: true,
  extension: [ ".js" ],
  transform: [
    [ "babelify", {
      presets: ["es2015", "stage-0"],
      plugins: ["add-module-exports", "transform-runtime"]
    }]
  ]
};

module.exports = {
  app: {
    options: options,
    src: ["src/index.js"],
    dest: "dist/<%= pkg.name %>.js"
  },

  watch: {
    options: Object.assign({}, options, { watch: true }),
    src: ["src/index.js"],
    dest: "dist/<%= pkg.name %>.js"
  }

};
