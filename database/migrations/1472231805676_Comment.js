'use strict';

const Schema = use('Schema');

class CommentSchema extends Schema {

  up() {
    this.create('comments', (table) => {
      table.increments();
      table.integer('post_id').references('posts.id').onDelete('cascade');
      table.text('markdown');
      table.integer('user_id').references('users.id').onDelete('cascade');
      table.timestamps();
    });
  }

  down() {
    this.drop('comments');
  }

}

module.exports = CommentSchema;
