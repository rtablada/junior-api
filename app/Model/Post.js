'use strict';

const Lucid = use('Lucid');
const Tag = use('App/Model/Tag');

class Post extends Lucid {

  static * createTags(post, tagsString = '') {
    const tagsStrings = tagsString.split(',');

    const tags = yield tagsStrings.map((tag) => {
      const values = { name: tag.trim() };

      return Tag.findOrCreate(values, values);
    });

    yield post.tags().sync(tags.map((tag) => tag.id));
  }

  comments() {
    return this.hasMany('App/Model/Comment', 'id', 'post_id');
  }
  user() {
    return this.belongsTo('App/Model/User', 'id', 'user_id');
  }

  tags() {
    return this.belongsToMany('App/Model/Tag');
  }
}

module.exports = Post;
