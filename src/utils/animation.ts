export const fadeIn = (el: HTMLElement, duration: number): Promise<void> => {
  let t: NodeJS.Timeout;
  return new Promise((resolve) => {
    clearTimeout(t);

    el.style.display = 'block';
    el.style.animationDuration = `${duration}ms`;
    el.classList.add('animate');
    el.classList.add('in');

    t = setTimeout(() => {
      el.classList.remove('in');
      el.classList.remove('animate');
      el.style.animationDuration = '';

      resolve();
    }, duration);
  });
};

export const fadeOut = (el: HTMLElement, duration: number): Promise<void> => {
  let t: NodeJS.Timeout;
  return new Promise((resolve) => {
    clearTimeout(t);

    el.style.animationDuration = `${duration}ms`;
    el.classList.add('animate');
    el.classList.add('out');

    t = setTimeout(() => {
      el.style.display = 'none';
      el.classList.remove('out');
      el.classList.remove('animate');
      el.style.animationDuration = '';

      resolve();
    }, duration);
  });
};
