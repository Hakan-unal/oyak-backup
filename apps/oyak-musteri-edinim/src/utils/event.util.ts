export const resetInActiveTimeEvent = () => {
  if (window !== undefined) {
    window.dispatchEvent(new Event('reset-inactive-time'));
  }
};
