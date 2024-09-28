export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): T & { flush: () => void } {
  let timeout: NodeJS.Timeout | null = null;
  const debounced = function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeout!);
    timeout = setTimeout(() => func.apply(this, args as any), wait);
  } as T & { flush: () => void };
  debounced.flush = function () {
    if (timeout) {
      clearTimeout(timeout);
      func();
    }
  };
  return debounced;
}
