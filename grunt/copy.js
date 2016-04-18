module.exports = {
  dist: {
    files: [{
      src: "dist/tourney-web.css",
      dest: "../TourneyParse/public/css/tourney-web.css"
    }, {
      src: "dist/tourney-web.js",
      dest: "../TourneyParse/public/js/tourney-web.js"
    }]
  },
  deploy: {
    files: [{
      src: "dist/**",
      dest: "./deploy/"
    },
    {
      src: "assets/**",
      dest: "./deploy/"
    },
    {
      src: "./*.html",
      dest: "./deploy/"
    }
    ]
  }
};
