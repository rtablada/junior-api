'use strict';

const Schema = use('Schema');

class TagSchema extends Schema {

  up() {
    this.create('tags', (table) => {
      table.increments();
      table.string('name');
      
      table.timestamps();
    });
  }

  down() {
    this.drop('tags');
  }

}

module.exports = TagSchema;
