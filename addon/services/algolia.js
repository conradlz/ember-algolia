import Ember from 'ember';

export default Ember.Service.extend({
  search: function(query, params, callback) {
    if(query) {
      if(Array.isArray(query) && typeof params === 'function') // if multiple indices
        return this.get('client').search(query, params);
      else if(typeof params === 'function') // if no params
        return this.accessIndex(query.indexName).search(query.query, params);
      else if (typeof params === 'object' && typeof callback === 'function') // if params and callback
        return this.accessIndex(query.indexName).search(query.query, params, callback);
    }
    else
      Ember.Logger.log(`Could not search algolia for query "${query}"`);
  },
  getObjects: function(query, params, callback) {
    if(query) {
      if(Array.isArray(query.ids)){ // if multiple objects
        if (typeof params === 'function')
          return this.accessIndex(query.indexName).getObjects(query.ids, params);
        else if (Array.isArray(params) && typeof callback === 'function')
          return this.accessIndex(query.indexName).getObjects(query.ids, params, callback);
      }
      else { // if one object
        if (typeof params === 'function')
          return this.accessIndex(query.indexName).getObject(query.ids, params);
        else if (Array.isArray(params) && typeof callback === 'function')
          return this.accessIndex(query.indexName).getObject(query.ids, params, callback);
      }
    }
    else
      Ember.Logger.log(`Could not search algolia for object "${query}"`);
  },
  accessIndex: function(IndexName) {
    if (!this.get('indices').get(IndexName))
      this.get('indices').set(IndexName, this.get('client').initIndex(IndexName));
    return this.get('indices').get(IndexName);
  }
});
