export const revealAnimation = (isInView: boolean) => ({
  initial: { opacity: 0 },
  animate: isInView ? { opacity: 1 } : { opacity: 0 },
  transition: {
    opacity: { duration: 0.5, ease: 'linear' }
  }
});
