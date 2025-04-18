import gsap from 'gsap';

export const getGsapCharTween = (target) =>
  gsap.to(target, {
    keyframes: [
      { yPercent: -100 },
      { yPercent: 100, duration: 0 },
      { yPercent: 0 },
    ],
    ease: 'sine.out',
    stagger: 0.02,
    duration: 0.4,
  });
