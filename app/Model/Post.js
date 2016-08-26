'use strict'

const Lucid = use('Lucid')

class Post extends Lucid {


  comments() {
    return this.hasMany('App/Model/Comment', 'id', 'post_id');
  }
  user() {
    return this.belongsTo('App/Model/User', 'id', 'user_id');
  }
}

module.exports = Post
