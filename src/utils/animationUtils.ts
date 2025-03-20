
/**
 * Animation utilities for enhancing UI transitions
 */

// Animation variants for step transitions
export const stepTransitionVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    }
  },
  exit: { 
    opacity: 0, 
    x: -20,
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    }
  }
};

// Animation variants for form elements
export const formElementVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.1,
      duration: 0.3,
      ease: 'easeOut',
    }
  })
};

// Get CSS class for animated transitions
export const getTransitionClass = (isEntering: boolean): string => {
  return isEntering 
    ? 'animate-scale-in transition-all duration-300 ease-in-out' 
    : 'animate-scale-out transition-all duration-200 ease-in-out';
};

// Function to add fade-in animation to elements in sequence
export const applySequencedAnimation = (
  element: HTMLElement, 
  delay: number = 100, 
  baseClass: string = 'opacity-0'
): void => {
  if (!element) return;
  
  const children = Array.from(element.children) as HTMLElement[];
  
  children.forEach((child, index) => {
    child.classList.add(baseClass);
    setTimeout(() => {
      child.classList.remove(baseClass);
      child.classList.add('animate-fade-in');
    }, index * delay);
  });
};
