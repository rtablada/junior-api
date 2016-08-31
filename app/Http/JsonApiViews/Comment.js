const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Comment extends JsonApiView {
  get attributes() {
    return ['markdown', 'created_at'];
  }

  post() {
    return this.belongsTo('App/Http/JsonApiViews/Post', {
      included: true,
      excludeRelation: 'comments',
    });
  }

  user() {
    return this.belongsTo('App/Http/JsonApiViews/User', {
      included: true,
      excludeRelation: 'comments',
    });
  }

}

module.exports = Comment;
