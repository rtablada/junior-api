'use strict'

const Lucid = use('Lucid')

class Comment extends Lucid {


  post() {
    return this.belongsTo('App/Model/Post', 'id', 'post_id');
  }
  user() {
    return this.belongsTo('App/Model/User', 'id', 'user_id');
  }
}

module.exports = Comment
