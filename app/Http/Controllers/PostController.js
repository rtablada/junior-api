'use strict';

const Post = use('App/Model/Post');
const attributes = ['post-type', 'json-data'];
const snakecaseKeys = require('snakecase-keys');

class PostController {

  * index(request, response) {
    const filter = request.input('filter');
    if (filter) {
      const posts = yield Post.with('comments.user', 'user')
        .where(snakecaseKeys(filter)).fetch();

      response.jsonApi('Post', posts);
    } else {
      const posts = yield Post.with('comments.user', 'user').fetch();

      response.jsonApi('Post', posts);
    }

  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      user_id: request.authUser.id,
    };
    const post = yield Post.create(Object.assign({}, input, foreignKeys));
    yield post.related('user').load;

    response.jsonApi('Post', post);
  }

  * show(request, response) {
    const id = request.param('id');
    const post = yield Post.with('comments.user', 'user').where({ id }).firstOrFail();

    response.jsonApi('Post', post);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      user_id: request.authUser.id,
    };

    const post = yield Post.with('comments.user', 'user').where({ id }).firstOrFail();
    yield post.update(Object.assign({}, input, foreignKeys));

    response.jsonApi('Post', post);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const post = yield Post.query().where({ id }).firstOrFail();
    yield post.delete();

    response.status(204).send();
  }

}

module.exports = PostController;
