/* eslint-env node */

let RSVP = require('rsvp');

module.exports = {
  description: '',
  normalizeEntityName() {},
  afterInstall() {
    return RSVP.all([
      this.addPackageToProject('algoliasearch'),
      this.addAddonToProject('ember-browserify'),
    ]);
  }
};
