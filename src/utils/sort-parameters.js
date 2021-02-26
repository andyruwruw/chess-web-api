/* eslint-disable valid-typeof */
/* eslint-disable no-console */

/**
 * Returns a default object.
 *
 * @param {string} type Type of object
 * @returns {*} Default object of that type
 */
function defaultObject(type) {
  if (type === 'string') {
    return '';
  } if (type === 'object') {
    return {};
  } if (type === 'function') {
    const noop = () => (null);
    return noop;
  } if (type === 'array') {
    return [];
  }
  return null;
}

/**
 * Defaults parameters if not present.
 *
 * @param {Array<string>} types Array of each parameter's type
 * @param {Array<*>} parameters Arrat of parameters
 * @returns {Array<*>} Array of parameters with undefined values filled.
 */
function sortParameters(types, parameters) {
  const result = [];

  // Run through each parameter given
  for (let i = 0; i < parameters.length; i += 1) {
    if (parameters[i] !== undefined) {
      // Fill in unprovided parameters
      while ((result.length < types.length)
        && ((typeof (parameters[i]) !== types[result.length])
          || parameters[i] instanceof Array)
        && (!(parameters[i] instanceof Array)
          || (parameters[i] instanceof Array
            && types[result.length] !== 'array'))) {
        result.push(defaultObject(types[result.length]));
      }
      if (result.length < types.length) {
        result.push(parameters[i]);
      }
    }
  }

  return result;
}

module.exports = {
  sortParameters,
};
