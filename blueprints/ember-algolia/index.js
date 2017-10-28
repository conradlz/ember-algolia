/* eslint-env node */

const RSVP = require('rsvp');

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
