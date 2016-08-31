const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Post extends JsonApiView {
  get attributes() {
    return ['post_type', 'json_data', 'created_at'];
  }

  comments() {
    return this.hasMany('App/Http/JsonApiViews/Comment', {
      included: true,
      excludeRelation: 'post',
    });
  }

  tags() {
    return this.hasMany('App/Http/JsonApiViews/Tag', {
      included: true,
      excludeRelation: 'posts',
    });
  }

  user() {
    return this.belongsTo('App/Http/JsonApiViews/User', {
      included: true,
      excludeRelation: 'posts',
    });
  }

}

module.exports = Post;
