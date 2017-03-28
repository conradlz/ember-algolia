import Ember from 'ember';
import config from '../config/environment';
import algoliasearch from 'npm:algoliasearch';

const { merge, set } = Ember;


export function initialize( appInstance ) {
  const service = appInstance.lookup('service:algolia');
  let algoliaConfig = config['ember-algolia'];

  set(service, 'client', algoliasearch(algoliaConfig.algoliaId, algoliaConfig.algoliaKey));
  set(service, 'indices', new Ember.Object());

}

export default {
  name: 'config',
  initialize
};
