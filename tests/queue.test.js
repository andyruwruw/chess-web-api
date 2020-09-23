/* eslint-disable no-undef */
const Queue = require('../src/queue/index');

function QueueObject() {
  this.addMethods(Queue);
  this.queueSetup();
}

QueueObject.prototype = {
  addMethods(methods) {
    const queueMethods = Object.keys(methods);

    for (let i = 0; i < queueMethods.length; i += 1) {
      this[queueMethods[i]] = methods[queueMethods[i]];
    }
  },

  add(a, b) {
    return a + b;
  },
};

let queue = null;

beforeEach(() => {
  queue = new QueueObject();
});

afterEach(() => {
  queue = null;
});

it('Function: Queue (setup)', async () => {
  expect.assertions(3);

  expect(queue).toHaveProperty('_running');
  expect(queue).toHaveProperty('_requests');
  expect(queue._requests).toBeInstanceOf(Array);
});

it('Function: Queue (dispatch)', async () => {
  expect.assertions(1);
  const method = jest.fn();
  await queue.dispatch(method, () => (null), []);
  expect(method).toHaveBeenCalled();
});

it('Function: Queue (dispatch with parameters)', async () => {
  expect.assertions(1);
  const method = jest.fn();
  await queue.dispatch(method, () => (null), ['1', '2']);
  expect(method).toHaveBeenLastCalledWith('1', '2', undefined);
});
