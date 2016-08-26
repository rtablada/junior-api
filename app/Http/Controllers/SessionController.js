'use strict';

const User = use('App/Model/User');
const E = require('node-exceptions');
const Hash = use('Hash');

class SessionController {

  * store(request, response) {
    const { username, password } = request.all();

    try {
      const user = yield User.findBy('email', username);
      const passwordValid = yield Hash.verify(password, user.password);

      if (!passwordValid) {
        throw new E();
      }

      const token = yield request.auth.generate(user);
      response.json({ access_token: token });
    } catch (e) {
      console.log(e);
      response.status(401).json({
        errors: [
          {
            status: 401,
            title: 'User failed to login',
          },
        ],
      });
    }
  }

}

module.exports = SessionController;
