const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Tag extends JsonApiView {
  get attributes() {
    return ['name'];
  }

  posts() {
    return this.hasMany('App/Http/JsonApiViews/Post', {
      included: true,
      excludeRelation: 'tag'
    });
  }

}

module.exports = Tag;
