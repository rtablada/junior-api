'use strict';

const Schema = use('Schema');

class ProfileSchema extends Schema {

  up() {
    this.create('profiles', (table) => {
      table.increments();
      table.string('profile_picture');
      table.string('job_status');
      table.string('experience');
      table.string('educational_background');
      table.boolean('profile_completed');
      table.integer('user_id').references('users.id').onDelete('cascade');
      table.timestamps();
    });
  }

  down() {
    this.drop('profiles');
  }

}

module.exports = ProfileSchema;
