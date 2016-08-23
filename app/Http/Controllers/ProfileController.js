'use strict';

const Profile = use('App/Model/Profile');
const attributes = ['profile-picture', 'job-status', 'experience', 'educational-background', 'profile-completed'];

class ProfileController {

  * index(request, response) {
    const profiles = yield Profile.with('user').fetch();

    response.jsonApi('Profile', profiles);
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

    const profile = yield Profile.findOrFail(id);
    profile.fill(input);
    yield profile.save(input);

    response.jsonApi('Profile', profile);
  }

}

module.exports = ProfileController;
