import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useDate } from '../../src/hooks/UseDate';

describe('useDate', () => {
	vi.useFakeTimers();
	const { result } = renderHook(() => useDate());
  
	it('Should returns the current date', () => {
		expect(result.current).toBeInstanceOf(Date);
	});

	it('Should updates the current date every second', () => {
		const initialDate = result.current;

		act(() => {
			vi.advanceTimersByTime(1000);
		});

		expect(result.current).not.toEqual(initialDate);
	});

	it('Should clear the interval on unmount', () => {
		vi.spyOn(window, 'clearInterval');
		const { unmount } = renderHook(() => useDate());

		unmount();

		expect(clearInterval).toHaveBeenCalled();
	});
});