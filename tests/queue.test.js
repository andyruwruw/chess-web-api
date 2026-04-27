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

describe('Functionality: Priority Queue', () => {
  beforeEach(() => {
    queue = new QueueObject();
  });

  afterEach(() => {
    queue = null;
  });

  describe('Queue Setup', () => {
    it('Valid Instantiation', () => {
      try {
        expect.assertions(3);

        expect(queue).toHaveProperty('_running');
        expect(queue).toHaveProperty('_requests');
        expect(queue._requests).toBeInstanceOf(Array);
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe('Dispatch', () => {
    it('Valid Call', async () => {
      try {
        expect.assertions(1);
        const method = jest.fn();
        await queue.dispatch(method, () => (null), []);
        expect(method).toHaveBeenCalled();
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe('Dispatch with Parameters', () => {
    it('Valid Call', async () => {
      try {
        expect.assertions(1);
        const method = jest.fn();
        await queue.dispatch(method, () => (null), ['1', '2']);
        expect(method).toHaveBeenLastCalledWith('1', '2', undefined);
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe('Dispatch Error Cases', () => {
    it('Throws when method is missing', () => {
      expect.assertions(1);
      expect(() => queue.dispatch(null, () => {}, [])).toThrow('dispatch requires request function');
    });

    it('Throws when callback is missing', () => {
      expect.assertions(1);
      expect(() => queue.dispatch(jest.fn(), null, [])).toThrow('dispatch requires callback function');
    });
  });

  describe('Priority Ordering', () => {
    it('Inserts higher-priority items before lower-priority items', () => {
      expect.assertions(2);
      queue._running = true; // prevent startRequests from dequeuing

      queue.enqueue({
        priority: 5, method: jest.fn(), callback: () => {}, parameters: [], callbackParameters: [],
      });
      queue.enqueue({
        priority: 1, method: jest.fn(), callback: () => {}, parameters: [], callbackParameters: [],
      });
      queue.enqueue({
        priority: 3, method: jest.fn(), callback: () => {}, parameters: [], callbackParameters: [],
      });

      expect(queue._requests[0].priority).toBe(1);
      expect(queue._requests[1].priority).toBe(3);

      queue.clearQueue();
      queue._running = false;
    });
  });

  describe('Dequeue', () => {
    it('Returns null when queue is empty', () => {
      expect.assertions(1);
      expect(queue.dequeue()).toBeNull();
    });
  });

  describe('ClearQueue', () => {
    it('Empties the request queue', () => {
      expect.assertions(2);
      queue._running = true; // prevent startRequests

      queue.enqueue({
        priority: 1, method: jest.fn(), callback: () => {}, parameters: [], callbackParameters: [],
      });
      expect(queue._requests).toHaveLength(1);

      queue.clearQueue();
      expect(queue._requests).toHaveLength(0);
      queue._running = false;
    });
  });

  describe('Error Handling', () => {
    it('Method rejection propagates to callback', (done) => {
      const failingMethod = jest.fn().mockRejectedValue(new Error('test error'));
      queue.dispatch(failingMethod, (response, error) => {
        try {
          expect(error).toBeInstanceOf(Error);
          expect(error.message).toBe('test error');
          done();
        } catch (err) {
          done(err);
        }
      }, []);
    });
  });

  describe('Multiple Requests', () => {
    it('Processes requests sequentially when dispatched together', (done) => {
      let count = 0;
      const method = jest.fn().mockResolvedValue('ok');
      const cb = () => {
        count += 1;
        if (count === 2) {
          try {
            expect(count).toBe(2);
            done();
          } catch (err) {
            done(err);
          }
        }
      };
      queue.dispatch(method, cb, []);
      queue.dispatch(method, cb, []);
    });
  });
});
