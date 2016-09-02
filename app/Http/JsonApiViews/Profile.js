const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Profile extends JsonApiView {
  get attributes() {
    return [
      'profile_picture',
      'job_status',
      'experience',
      'educational_background',
      'profile_completed',
      'job_title',
      'current_company',
      'mini_resume',
      'learning',
      'work',
    ];
  }

  user() {
    return this.belongsTo('App/Http/JsonApiViews/User', {
      included: true,
      excludeRelation: 'profile',
    });
  }
}

module.exports = Profile;
