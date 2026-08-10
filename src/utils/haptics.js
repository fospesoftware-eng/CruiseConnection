// Haptic vibration utility for tactile user experience

export const hapticFeedback = {
  light: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(12);
      } catch (e) {
        // Ignore if restricted by permissions
      }
    }
  },
  medium: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([25, 40, 25]);
      } catch (e) {}
    }
  },
  success: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([35, 60, 35, 60, 50]);
      } catch (e) {}
    }
  }
};
