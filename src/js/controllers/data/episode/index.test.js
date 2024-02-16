/**
 * @jest-environment jsdom
 */

import {jest} from '@jest/globals';

import { setHTML, startStimulus, getControllerInstance } from '@js/lib/stimulus-helper';

import EpisodesController from './index';

let getFiltersMock;
let episodesController;

const html = (values) => `<div id="episodes" data-controller="episodes" data-episodes-items-value="12" data-episodes-offset-value="1" ${values}>
<div data-episodes-target="items"></div>
</div>`;

describe('EpisodesController', () => {
  beforeAll(() => {
    jest.resetAllMocks();
    startStimulus('episodes', EpisodesController);

    EpisodesController.prototype.getData = jest.fn().mockResolvedValue('<div data-count="12" data-episodes-target="count"></div>');
    EpisodesController.prototype.getFilters = jest.fn().mockReturnValue('disco, reggae');

    getFiltersMock = jest.spyOn(EpisodesController.prototype, 'getFilters');
  });

  it('sets minimum parameters', async () => {
    await setHTML(html());
    episodesController = await getControllerInstance('episodes');
    expect(episodesController.params).toEqual({offset: 1, limit: 12});
  });

  it('sets optional parameters', async () => {
    await setHTML(html('data-filtered="true" data-episodes-search-value="true" data-episodes-template-value="list"'));
    episodesController = await getControllerInstance('episodes');
    expect(episodesController.params.filters).toEqual(['disco', ' reggae']);
    expect(episodesController.params.q).toEqual('');
    expect(episodesController.params.template).toEqual('list');
    expect(getFiltersMock).toHaveBeenCalledTimes(2);
  });
});
