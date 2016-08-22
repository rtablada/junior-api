const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class User extends JsonApiView {
  get attributes() {
    return ['username', 'email', 'first_name', 'last_name'];
  }
}

module.exports = User;
