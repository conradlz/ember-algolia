import { set } from '@ember/object';
import config from '../config/environment';
import algoliasearch from 'npm:algoliasearch';

export function initialize( appInstance ) {
    const service = appInstance.lookup('service:algolia');
    const algoliaConfig = config['ember-algolia'];

    set(service, 'client', algoliasearch(algoliaConfig.algoliaId, algoliaConfig.algoliaKey));

}

export default {
    name: 'algolia-config',
  initialize
	};