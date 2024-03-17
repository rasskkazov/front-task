export function debounce<Args extends unknown[], Result>(
  fn: (...args: Args) => Result,
  time: number
) {
  let timer: number;
  return (...args: Args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = window.setTimeout(() => {
      fn(...args);
    }, time);
  };
}
