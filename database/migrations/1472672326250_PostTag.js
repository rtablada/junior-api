'use strict';

const Schema = use('Schema');

class PostTagSchema extends Schema {

  up() {
    this.create('post_tag', (table) => {
      table.increments();
      table.integer('post_id');
      table.integer('tag_id');
    });
  }

  down() {
    this.drop('post_tag');
  }

}

module.exports = PostTagSchema;
