export const revealAnimation = (isInView: boolean) => ({
  initial: { y: 50, opacity: 0 },
  animate: isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 },
  transition: {
    y: { type: 'tween' },
    opacity: { duration: 0.5, ease: 'linear' }
  }
});
