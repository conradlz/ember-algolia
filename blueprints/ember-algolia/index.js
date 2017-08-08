/* eslint-env node */

let RSVP = require('rsvp');

module.exports = {
  description: '',
  afterInstall() {
    return RSVP.all([
      this.addPackageToProject('algoliasearch'),
      this.addAddonToProject('ember-browserify'),
    ]);
  }
};
