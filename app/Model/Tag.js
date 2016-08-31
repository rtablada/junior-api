'use strict'

const Lucid = use('Lucid')

class Tag extends Lucid {


  posts() {
    return this.belongsToMany('App/Model/Post');
  }
}

module.exports = Tag
