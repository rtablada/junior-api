'use strict';

const Schema = use('Schema');

class ProfileModifySchema extends Schema {

  up() {
    this.table('profiles', (table) => {
      table.string('job_title');
      table.string('current_company');
      table.text('mini_resume');
      table.text('learning');
      table.text('work');
    });
  }

  down() {
    this.table('profiles', (table) => {
      table.dropColumn('job_title');
      table.dropColumn('current_company');
      table.dropColumn('mini_resume');
      table.dropColumn('learning');
      table.dropColumn('work');
    });
  }

}

module.exports = ProfileModifySchema;
