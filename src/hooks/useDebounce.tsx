import { useEffect, useRef, useState } from "react";

export const useDebounce = <T,>(value: T, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState<T>();
  const timerRef: any = useRef();

  useEffect(() => {
    timerRef.current = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [value, delay]);

  return debouncedValue;
};
