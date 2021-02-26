/* eslint-disable no-undef */
const { sortParameters } = require('../src/utils/sort-parameters');

describe('Functionality: Sort Parameters', () => {
  describe('sortParameters', () => {
    it('Parameters Filled', () => {
      try {
        expect.assertions(6);
        const a = { type: 'Object' };
        const b = () => ('Function 1');
        const c = 'string';
        const d = { type: 'Second Object' };

        const [_a, _b, _c, _d] = sortParameters(
          ['object', 'function', 'string', 'object'],
          [a, b, c, d],
        );

        expect(typeof (_a)).toBe('object');
        expect(typeof (_b)).toBe('function');
        expect(_b()).toBe('Function 1');
        expect(typeof (_c)).toBe('string');
        expect(typeof (_d)).toBe('object');
        expect(d.type).toBe('Second Object');
      } catch (error) {
        console.log(error);
      }
    });

    it('Parameters Missing', () => {
      try {
        expect.assertions(5);
        const a = { type: 'Object' };
        const b = undefined;
        const c = 'string';
        const d = { type: 'Second Object' };

        const [_a, _b, _c, _d] = sortParameters(
          ['object', 'function', 'string', 'object'],
          [a, b, c, d],
        );

        expect(typeof (_a)).toBe('object');
        expect(typeof (_b)).toBe('function');
        expect(_b()).toBe(null);
        expect(typeof (_c)).toBe('string');
        expect(typeof (_d)).toBe('object');
      } catch (error) {
        console.log(error);
      }
    });

    it('Parameter Last', () => {
      try {
        expect.assertions(5);
        const a = undefined;
        const b = undefined;
        const c = undefined;
        const d = [];

        const [_a, _b, _c, _d] = sortParameters(
          ['object', 'function', 'string', 'array'],
          [a, b, c, d],
        );

        expect(typeof (_a)).toBe('object');
        expect(typeof (_b)).toBe('function');
        expect(_b()).toBe(null);
        expect(typeof (_c)).toBe('string');
        expect(_d).toBeInstanceOf(Array);
      } catch (error) {
        console.log(error);
      }
    });
  });
});
