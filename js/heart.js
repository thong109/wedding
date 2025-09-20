const HeartAnimator = (container, options = {}) => {
  let active = false;
  let intervalId = null;
  let timeoutId = null;

  const opts = {
    spawnRate: 200,
    durationMin: 3,
    durationMax: 6,
    sizeMin: 0.2, // rem
    sizeMax: 0.2, // rem
    runTime: 5000,
    effect: 'fall',
    ...options
  };

  const random = (min, max) => Math.random() * (max - min) + min;

  const createHeart = () => {
    const el = document.createElement('div');
    el.className = 'heart';
    el.textContent = '❤️';

    const size = random(opts.sizeMin, opts.sizeMax);
    el.style.fontSize = size + 'rem';

    if (opts.effect === 'rise') {
      el.style.left = random(0, 100) + 'vw';
      el.style.bottom = '-10vh';
      el.style.animationName = 'rise';
    } else {
      el.style.left = random(0, 100) + 'vw';
      el.style.top = '-10vh';
      el.style.animationName = 'fall';
    }

    const duration = random(opts.durationMin, opts.durationMax);
    el.style.animationDuration = duration + 's';

    container.appendChild(el);
    setTimeout(() => el.remove(), duration * 1000);
  };

  const trigger = (force = false) => {
    if (!force && active) return;
    if (force) clear();

    active = true;
    intervalId = setInterval(createHeart, opts.spawnRate);
    timeoutId = setTimeout(clear, opts.runTime);
  };

  const clear = () => {
    clearInterval(intervalId);
    clearTimeout(timeoutId);
    intervalId = null;
    timeoutId = null;
    active = false;
  };

  return { trigger, clear };
};
