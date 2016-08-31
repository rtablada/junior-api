'use strict';

const Post = use('App/Model/Post');
const Database = use('Database');
const attributes = ['post-type', 'json-data'];
const snakecaseKeys = require('snakecase-keys');

class PostController {

  * index(request, response) {
    const filter = request.input('filter');
    const filterJson = request.input('filter-json');
    if (filter) {
      const posts = yield Post.with('tags', 'comments.user', 'user')
        .where(snakecaseKeys(filter)).fetch();

      response.jsonApi('Post', posts);
    } else if (filterJson) {
      const posts = yield Post.with('tags', 'comments.user', 'user')
        .join('users', 'posts.user_id', 'users.id')
        .join('post_tag', 'posts.id', 'post_tag.post_id')
        .join('tags', 'post_tag.tag_id', 'tags.id')
        .where(Database.raw('json_data->>\'description\''), 'ilike', `%${filterJson.q}%`)
        .orWhere(Database.raw('json_data->>\'title\''), 'ilike', `%${filterJson.q}%`)
        .orWhere('tags.name', 'ilike', `%${filterJson.q}%`)
        .orWhere('users.first_name', 'ilike', `%${filterJson.q}%`)
        .orWhere('users.last_name', 'ilike', `%${filterJson.q}%`)
        .select('posts.*')
        .fetch();

      response.jsonApi('Post', posts);
    } else {
      const posts = yield Post.with('tags', 'comments.user', 'user').fetch();

      response.jsonApi('Post', posts);
    }
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);

    const post = yield request.authUser.posts().create(input);
    yield Post.createTags(post, input.json_data.tagsString);

    response.jsonApi('Post', post);
  }

  * show(request, response) {
    const id = request.param('id');
    const post = yield Post.with('tags', 'comments.user', 'user').where({ id }).firstOrFail();

    response.jsonApi('Post', post);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      user_id: request.authUser.id,
    };

    const post = yield Post.with('tags', 'comments.user', 'user').where({ id }).firstOrFail();
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
