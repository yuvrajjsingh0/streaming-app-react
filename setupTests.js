import '@testing-library/jest-dom'; // Ensure this line is present to extend Jest with additional matchers

class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  
  // Assign the mock to the global object
  global.ResizeObserver = ResizeObserver;