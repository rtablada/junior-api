'use strict';

const Comment = use('App/Model/Comment');
const attributes = ['markdown'];

class CommentController {

  * index(request, response) {
    const comments = yield Comment.with('post', 'user').fetch();

    response.jsonApi('Comment', comments);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      post_id: request.input('data.relationships.post.data.id'),
      user_id: request.authUser.id,
    };
    const comment = yield Comment.create(Object.assign({}, input, foreignKeys));
    yield comment.related('user').load();

    response.jsonApi('Comment', comment);
  }

  * show(request, response) {
    const id = request.param('id');
    const comment = yield Comment.with('post', 'user').where({ id }).firstOrFail();

    response.jsonApi('Comment', comment);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      post_id: request.input('data.relationships.post.data.id'),
      user_id: request.authUser.id,
    };

    const comment = yield Comment.with('post', 'user').where({ id }).firstOrFail();
    yield comment.update(Object.assign({}, input, foreignKeys));

    response.jsonApi('Comment', comment);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const comment = yield Comment.query().where({ id }).firstOrFail();
    yield comment.delete();

    response.status(204).send();
  }

}

module.exports = CommentController;
