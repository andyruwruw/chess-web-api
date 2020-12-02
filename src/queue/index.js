const { sortParameters } = require('../utils/sort-parameters');

/**
 * Sets up priority queue
 */
function queueSetup() {
  this._requests = [];
  this._running = false;
}

/**
 * Prepares a request to be added to the queue
 * @param {function} method chess-web-api function for request
 * @param {function} callback Function to be called with result
 * @param {array} parameters Array of parameter to be passed into chess-web-api function
 * @param {object} [options] Added query parameters to the end of the URL
 * @param {array} [callbackParameters] Array of parameters to be padded on to callback method.
 * @param {number} [priority] Prirority in queue (1 in highest)
 */
function dispatch(method, callback, parameters, options, callbackParameters, priority) {
  if (!method || typeof (method) !== 'function') {
    throw Error('dispatch requires request function');
  }
  if (!callback || typeof (callback) !== 'function') {
    throw Error('dispatch requires callback function');
  }

  const [_parameters, _options, _callbackParameters, _priority] = sortParameters(
    ['array', 'object', 'function', 'number'],
    [parameters, options, callbackParameters, priority],
  );

  const request = {
    method,
    callback,
    parameters: _parameters,
    options: _options,
    priority: _priority || 1,
    callbackParameters: _callbackParameters || [],
  };

  this.enqueue(request);
}

/**
 * Adds a request to the queue
 * @param {object} request Request object from dispatch
 */
function enqueue(request) {
  let contain = false;

  for (let i = 0; i < this._requests.length; i += 1) {
    if (this._requests[i].priority > request.priority) {
      this._requests.splice(i, 0, request);
      contain = true;
      break;
    }
  }
  if (!contain) {
    this._requests.push(request);
  }
  if (!this._running) {
    this.startRequests();
  }
}

/**
 * Retrieves / removes first request in queue
 * @returns {object} Request object from dispatch
 */
function dequeue() {
  if (this._requests.length === 0) {
    return null;
  }
  return (this._requests.shift());
}

/**
 * Removes all previous requests
 */
function clearQueue() {
  this._requests = [];
}

/**
 * Runs each request consecutively
 */
async function startRequests() {
  while (this._requests.length > 0) {
    if (!this._running) {
      this._running = true;
    }
    const request = this.dequeue();
    const { method, callback } = request;
    let error = null;
    // eslint-disable-next-line no-await-in-loop
    const response = await method(...request.parameters, request.options).catch((e) => error = e);
    callback(response, error, ...request.callbackParameters);
  }
  this._running = false;
}

module.exports = {
  queueSetup,
  dispatch,
  enqueue,
  dequeue,
  clearQueue,
  startRequests,
};
