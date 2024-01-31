/**
 * @jest-environment jsdom
 */

import {jest} from '@jest/globals'

import { getHTML, setHTML, startStimulus, getControllerInstance } from '../../../lib/stimulus-helper';

// import { Application } from '@hotwired/stimulus';
// jest.mock('@js/models/storage', () => jest.requireActual('@js/models/__mocks__/storage'));

// import Api, { mockRequest } from '../../../models/api';

// import api from '../../../models/Api';

jest.mock('@js/models/storage');

// import Storage, {getItem} from '@js/models/storage';


jest.mock('@js/models/api');

import EpisodesController from './index';



let getItemMock;
let requestMock;

let episodesController;




// const initialiseStimulus = () => {
//   application = Application.start();
//   application.register('episodes', EpisodesController);
// };

describe('EpisodesController', () => {
  beforeEach(() => {
    // jest.resetAllMocks()
    startStimulus('episodes', EpisodesController);
    
  });

  describe('add', () => {
    test('hello world test', async () => {

      getItemMock = jest.spyOn(EpisodesController.storage, 'getItem');
      requestMock = jest.spyOn(EpisodesController.api, 'request');

      // console.log('EpisodesController.api', EpisodesController.api)
      // requestMock = jest.spyOn(EpisodesController.api, 'request');
      
      
      await setHTML(`<div id="episodes" data-controller="episodes" data-episodes-items-value="12" data-episodes-offset-value="1">
      <div data-episodes-target="items"></div>
      </div>`);

      // requestMock = jest.spyOn(EpisodesController.storage, 'getItem');
      // episodesController.storage.getItem = jest.fn(() => {
      //   console.log('MOCK')
      // });

      // episodesController = await getControllerInstance('episodes');

      // console.log('episodesController', episodesController)

      // console.log('storage', episodesController.storage.getItem)

      

      // expect(setParamsMock).toHaveBeenCalledWith(12, 1, '');
      // setTimeout(() => {
      expect(getItemMock).toHaveBeenCalledTimes(1);
      expect(requestMock).toHaveBeenCalledTimes(1);
      // });
      // expect(requestMock).toHaveBeenCalledTimes(1);
    });
  });

  // describe('add2', () => {
  //   test('hello world test2', async () => {

  //     // getItemMock = jest.spyOn(EpisodesController.storage, 'getItem');

      
  //     // requestMock = jest.spyOn(EpisodesController.api, 'request');
  //     // console.log('EpisodesController.api', EpisodesController.api)
      
      
  //     await setHTML(`<div id="episodes" data-controller="episodes" data-episodes-items-value="12" data-episodes-offset-value="1">
  //     <div data-episodes-target="items"></div>
  //     </div>`);

  //     // requestMock = jest.spyOn(EpisodesController.storage, 'getItem');
  //     // episodesController.storage.getItem = jest.fn(() => {
  //     //   console.log('MOCK')
  //     // });

  //     // episodesController = await getControllerInstance('episodes');

  //     // console.log('episodesController', episodesController)

  //     // console.log('storage', episodesController.storage.getItem)

      

  //     // expect(setParamsMock).toHaveBeenCalledWith(12, 1, '');
  //     // setTimeout(() => {
  //     // expect(getItemMock).toHaveBeenCalledTimes(1);
  //     // expect(requestMock).toHaveBeenCalledTimes(1);
  //     // });
  //     // expect(requestMock).toHaveBeenCalledTimes(1);
  //   });
  // });
});
