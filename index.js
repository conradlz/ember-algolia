/* eslint-env node */
'use strict';

const path = require('path');
const funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
const filterInitializers = require('fastboot-filter-initializers');

function isFastBoot() {
  return process.env.EMBER_CLI_FASTBOOT === 'true';
}

module.exports = {
  name: 'ember-algolia',
  included(app) {
    this._super.included.apply(this, arguments);

    if (isFastBoot) {
      let host = this._findHost();
      this.importFastBootDependencies(host);
    }
  },
  treeForVendor(vendorTree) {
    let trees = [];

    if (vendorTree) {
      trees.push(vendorTree);
    }

    if (isFastBoot) {
      trees.push(funnel(path.join(__dirname, './assets'), {
        files: ['algoliasearch.js']
      }));
    }

    return mergeTrees(trees);
  },
  importFastBootDependencies(app) {
    let pkg = require(path.join(app.project.root, 'package.json'));
    let whitelist = pkg.fastbootDependencies;

    if (!whitelist || whitelist && !~whitelist.indexOf('algoliasearch')) {
      throw new Error("[ember-algolia] algoliasearch is missing from package.json's fastbootDependencies.\nSee: https://github.com/ember-fastboot/ember-cli-fastboot#whitelisting-packages");
    }

    this.import('vendor/algoliasearch.js');
  },
  preconcatTree(tree) {
    return filterInitializers(tree, this.app.name);
  }
};
