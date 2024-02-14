// This helper file provides a consistent API for testing Stimulus Controllers
//
// Use:
// import { getHTML, setHTML, startStimulus } from './_stimulus_helper';
// import MyController from '@javascripts/controllers/my_controller';
//
// beforeEach(() => startStimulus('my', MyController));
// test('should do something', async () => {
//   await setHTML(`<button data-controller="my" data-action="my#action">click</button>`);
//
//   const button = screen.getByText('click');
//   await button.click();
//
//   expect(getHTML()).toEqual('something');
// });
//
import { Application } from '@hotwired/stimulus';

// Initializes and registers the controller for the test file
// Use it in a before block:
// beforeEach(() => startStimulus('dom', DomController));
//
// @name = string of the controller
// @controller = controller class
//
// https://stimulus.hotwired.dev/handbook/installing#using-other-build-systems
let application;

export function startStimulus(name, controller) {
  application = Application.start();
  application.register(name, controller);
}

// Helper function for setting HTML
// - It trims content to prevent false negatives
// - It's async so there's time for the Stimulus controller to load
//
// Use within tests:
// await setHTML(`<p>My HTML Content</p>`);
export async function setHTML(content = '') {
  document.body.innerHTML = content.trim();
  return document.body.innerHTML;
}

// Helper function for getting HTML content
// - Trims content to prevent false negatives
// - Is consistent with setHTML
//
// Use within tests:
// expect(getHTML()).toEqual('something');
export function getHTML() {
  return document.body.innerHTML.trim();
}

export async function getControllerInstance(name) {
  return await application.getControllerForElementAndIdentifier(document.getElementById(name), name);
}
