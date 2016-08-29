'use strict';

const Lucid = use('Lucid');

class User extends Lucid {

  apiTokens() {
    return this.hasMany('App/Model/Token');
  }

  profile() {
    return this.hasOne('App/Model/Profile');
  }

  posts() {
    return this.hasMany('App/Model/Post');
  }

}

module.exports = User;
