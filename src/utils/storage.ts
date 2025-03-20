
/**
 * Utility functions for storing and retrieving data from local storage
 */

// Generic function to save any data to local storage
export const saveToStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving to local storage:", error);
  }
};

// Generic function to retrieve data from local storage
export const getFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (error) {
    console.error("Error retrieving from local storage:", error);
    return defaultValue;
  }
};

// Function to clear a specific key from local storage
export const clearFromStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error clearing from local storage:", error);
  }
};
