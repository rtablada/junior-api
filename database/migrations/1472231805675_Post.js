'use strict';

const Schema = use('Schema');

class PostSchema extends Schema {

  up() {
    this.create('posts', (table) => {
      table.increments();
      table.string('post_type');
      table.json('json_data');

      table.integer('user_id').references('users.id').onDelete('cascade');
      table.timestamps();
    });
  }

  down() {
    this.drop('posts');
  }

}

module.exports = PostSchema;
