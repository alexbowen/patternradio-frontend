// Import this named export into your test file:
console.log('mock file')
import {jest} from '@jest/globals'
export const getItem = jest.fn();
const mock = jest.fn().mockImplementation(() => {
  return {getItem};
});

export default mock;


import SoundPlayer from './sound-player';
// const mockPlaySoundFile = jest.fn();
// jest.mock('./sound-player', () => {
//   return jest.fn().mockImplementation(() => {
//     return {playSoundFile: mockPlaySoundFile};
//   });
// });

// getItem(name) {
//   if (this.isSupported) {
//     return localStorage.getItem(name);
//   }
//   if (this.inMemoryStorage.hasOwn(name)) {
//     return this.inMemoryStorage[name];
//   }
//   return null;
// }