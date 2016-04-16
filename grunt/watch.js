module.exports = {

  app: {
    files: [ 'src/**/*.scss', 'dist/<%= pkg.name %>.js' ],
    tasks: [ 'sass:app' ],
    options: {
      livereload: 35730,
      atBegin: true
    }
  }
};
