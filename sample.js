/* eslint-disable no-console */
const { sortParameters } = require('./src/utils/sort-parameters');

async function run() {
  try {
    const a = undefined;
    const b = undefined;
    const c = undefined;
    const d = [];

    const result = sortParameters(
      ['object', 'function', 'string', 'array'],
      [a, b, c, d],
    );

    console.log('results', result);
  } catch (e) {
    console.log(e);
  }
}

run();
