module.exports = {
  options: {
    dir: 'deploy',
    commit: true,
    push: true,
    message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
  },
  pages: {
    options: {
      remote: 'git@github.com:psychonull/ld35.git',
      branch: 'gh-pages'
    }
  }
};
