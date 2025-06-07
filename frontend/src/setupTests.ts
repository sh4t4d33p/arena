import '@testing-library/jest-dom';
import { describe, it, expect, beforeEach, afterEach, beforeAll, afterAll } from '@jest/globals';

// Extend Jest matchers globally
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toBeVisible(): R;
      toHaveTextContent(content: string): R;
      toHaveAttribute(attribute: string, value?: string): R;
      toHaveClass(...classNames: string[]): R;
    }
  }
  namespace NodeJS {
    interface Global {
      jest: typeof jest;
      describe: typeof describe;
      it: typeof it;
      expect: typeof expect;
      beforeEach: typeof beforeEach;
      afterEach: typeof afterEach;
      beforeAll: typeof beforeAll;
      afterAll: typeof afterAll;
    }
  }
}

// Configure Jest to use TypeScript
expect.extend({
  toContainHTML(received: HTMLElement, html: string) {
    const pass = received.innerHTML.includes(html);
    if (pass) {
      return {
        message: () => `expected ${received.innerHTML} not to contain ${html}`,
        pass: true,
      };
    }
    return {
      message: () => `expected ${received.innerHTML} to contain ${html}`,
      pass: false,
    };
  },
});
