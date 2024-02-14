/**
 * @jest-environment jsdom
 */

import {jest} from '@jest/globals';

import { setHTML, startStimulus, getControllerInstance } from '@js/lib/stimulus-helper';

import PostsController from './index';

let getFiltersMock;
let postsController;

const html = (values) => `<div id="posts" data-controller="posts" data-posts-items-value="12" data-posts-offset-value="1" ${values}>
<div data-posts-target="items"></div>
</div>`;

describe('EpisodesController', () => {
  beforeAll(() => {
    jest.resetAllMocks();
    startStimulus('posts', PostsController);

    PostsController.prototype.getData = jest.fn().mockResolvedValue('<div data-count="12" data-posts-target="count"></div>');
    PostsController.prototype.getFilters = jest.fn().mockReturnValue('disco, reggae');

    getFiltersMock = jest.spyOn(PostsController.prototype, 'getFilters');
  });

  it('sets minimum parameters', async () => {
    await setHTML(html());
    postsController = await getControllerInstance('posts');
    expect(postsController.params).toEqual({offset: 1, limit: 12});
  });

  it('sets optional parameters', async () => {
    await setHTML(html('data-posts-filters-value="true" data-posts-search-value="true" data-posts-template-value="list"'));
    postsController = await getControllerInstance('posts');
    expect(postsController.params.filters).toEqual(['disco', ' reggae']);
    expect(postsController.params.q).toEqual('');
    expect(postsController.params.template).toEqual('list');
    expect(getFiltersMock).toHaveBeenCalledTimes(1);
  });
});
