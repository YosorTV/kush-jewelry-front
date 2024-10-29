export const navAnimations = {
  initial: {
    display: 'none',
    opacity: 0,
    zIndex: 0,
    transition: { type: 'tween', ease: 'easeOut', duration: 0.25 }
  },
  animate: {
    display: 'flex',
    zIndex: 100,
    opacity: 1,
    transition: { type: 'tween', ease: 'easeOut', duration: 0.25 }
  },
  exit: {
    display: 'none',
    opacity: 0,
    zIndex: 0,
    transition: { type: 'tween', ease: 'easeOut', duration: 0.25 }
  }
};
