import { describe, expect, it, vi } from 'vitest';
import { LocaleDate } from '../../src/domain/LocaleDate';

describe('LocaleDate', () => {
	it('Should create LocaleDate', () => {
		vi
			.useFakeTimers()
			.setSystemTime(new Date('2020-05-12T23:50:21'));
		expect(LocaleDate.create().format()).toBe('23:50');
	});

	it('Should create LocaleDate from existing date', () => {
		expect(LocaleDate.of(new Date('2020-05-12T23:50:21')).format()).toBe('23:50');
	});
});