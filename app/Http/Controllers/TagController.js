'use strict';

const Tag = use('App/Model/Tag');
const attributes = ['name'];

class TagController {

  * index(request, response) {
    const tags = yield Tag.with('posts').fetch();

    response.jsonApi('Tag', tags);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
    };
    const tag = yield Tag.create(Object.assign({}, input, foreignKeys));

    response.jsonApi('Tag', tag);
  }

  * show(request, response) {
    const id = request.param('id');
    const tag = yield Tag.with('posts').where({ id }).firstOrFail();

    response.jsonApi('Tag', tag);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
    };

    const tag = yield Tag.with('posts').where({ id }).firstOrFail();
    yield tag.update(Object.assign({}, input, foreignKeys));

    response.jsonApi('Tag', tag);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const tag = yield Tag.query().where({ id }).firstOrFail();
    yield tag.delete();

    response.status(204).send();
  }

}

module.exports = TagController;
