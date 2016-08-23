'use strict';

const Profile = use('App/Model/Profile');
const attributes = ['profile-picture', 'job-status', 'experience', 'educational-background', 'profile-completed'];

class ProfileController {

  * index(request, response) {
    const profiles = yield Profile.with('user').fetch();

    response.jsonApi('Profile', profiles);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      user_id: user,
    };
    const profile = yield Profile.create(Object.assign({}, input, foreignKeys));

    response.jsonApi('Profile', profile);
  }

  * show(request, response) {
    const id = request.param('id');
    const profile = yield Profile.with('user').where({ id }).firstOrFail();

    response.jsonApi('Profile', profile);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      user_id: user,
    };

    const profile = yield Profile.with('user').where({ id }).firstOrFail();
    yield profile.update(Object.assign({}, input, foreignKeys));

    response.jsonApi('Profile', profile);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const profile = yield Profile.query().where({ id }).firstOrFail();
    yield profile.delete();

    response.status(204).send();
  }

}

module.exports = ProfileController;
