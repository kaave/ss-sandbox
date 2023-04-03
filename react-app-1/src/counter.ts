import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';

const counterAtom = atom(0);

export function useCounterState() {
  const [count] = useAtom(counterAtom);

  return count;
}

export function useCounterCommands() {
  const [, setCount] = useAtom(counterAtom);

  const increment = useCallback(() => setCount((prev) => prev + 1), [setCount]);
  const decrement = useCallback(() => setCount((prev) => prev - 1), [setCount]);

  return {
    increment,
    decrement,
  };
}
