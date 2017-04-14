# ember-algolia

This is an addon for integrating [Algolia | Hosted cloud search as a service](https://www.algolia.com) via javascript into ember.

It includes a service called algolia which exposes 3 methods of using algolia search.

 * *search(query, params, callback)*
   - **query** is an object with properties indexName and query
   - **params** is either parameters for the search or the callback if there are no parameters
   - **callback** is the callback function if there are parameters

 * *getById(indexName, ids, params, callback)*
   - **indexName** is the name of the index you would like to get objects in
   - **ids** is either a single id or an array of ids for objects you would like to search
   - **parameters** can be an array of properties you need specific to the objects you get or it can be the callback if there are no properties requested because then the function returns all of them.
   - **callback** is the function if there are parameters specified

 * *accessIndex(IndexName)*
   - **indexName** is the index you would like to access
   - returns the index and if used multiple times doesn't recreate the index

## Configuration

```
// algolia-using-app/config/enviroment.js

module.exports = function(environment) {
  var ENV = {
  // ...
    'ember-algolia': {
      algoliaId: '<ALGOLIA ID>',
      algoliaKey: '<ALGOLIA SEARCH KEY>'
    },
  // ...
  },
  return ENV;
}
```

## Examples

```
    this.get('algolia').search({ indexName: 'documents', query: 'user'}, function searchDone(err, content) {
      if (err) {
        console.error(err);
        return;
      }

      console.log('c1');
      console.log(content);
    });

    this.get('algolia').search({ indexName: 'documents', query: 'user'}, {attributesToRetrieve: ['d', 's'], hitsPerPage: 50 }, function searchDone(err, content) {
      if (err) {
        console.error(err);
        return;
      }

      console.log('c2');
      console.log(content);
    });

    this.get('algolia').search([{ indexName: 'documents', query: 'user', params: {hitsPerPage: 10 }}, { indexName: 'dev_cities', query: 'user', params: { hitsPerPage: 10 }}], function searchDone(err, content) {
      if (err) {
        console.error(err);
        return;
      }

      console.log('c3');
      console.log(content);
    });

    this.get('algolia').getById('documents', ["-Kd4CmhvHHsadshkwrtj","-Kd4CmhurVVPPaMNpSzM"], function searchDone(err, content) {
      if (err) {
        console.error(err);
        return;
      }

      console.log('c&');
      console.log(content);
    });

    this.get('algolia').getById('documents', "-Kd4CmhvHHsadshkwrtj", function searchDone(err, content) {
      if (err) {
        console.error(err);
        return;
      }

      console.log('c#');
      console.log(content);
    });
```

## Fastboot Support

This addon also supports [ember-cli-fastboot](https://github.com/ember-fastboot/ember-cli-fastboot) by using the node version of ember algolia as well as the browserified version. In order to make sure it works in fastboot, you will need:

```
// algolia-using-app/config/enviroment.js
  "fastbootDependencies": [
    "algoliasearch"
  ]
```

## Installation

* `ember install ember-algolia`
* `npm i`

## Needs Tests
This addon needs tests for the algolia service.

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`
