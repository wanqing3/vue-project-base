import { describe, expect, it } from 'vitest';
import { add } from '../src/utils';

describe('utils test', () => {
    it('100% pass', () => {
        expect(1).toBe(1);
    });
    it('add test', () => {
        expect(add(1, 2)).toBe(3);
    });
});
