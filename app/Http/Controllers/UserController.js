'use strict';

const Hash = use('Hash');
const User = use('App/Model/User');
const attributes = ['username', 'email', 'password', 'first-name', 'last-name'];

class UserController {

  * store(request, response) {
    const {email, username, password, first_name, last_name} = request.jsonApi.getAttributesSnakeCase(attributes);

    const user = yield User.create({
      email,
      username,
      password: yield Hash.make(password),
      first_name,
      last_name,
    });
    yield user.profile().create();

    response.jsonApi('User', user);
  }

  * show(request, response) {
    const id = request.param('id');
    const user = yield User.with().where({ id }).firstOrFail();

    response.jsonApi('User', user);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);

    const user = yield User.with().where({ id }).firstOrFail();
    yield user.update(input);

    response.jsonApi('User', user);
  }
}

module.exports = UserController;
