/// <reference types="jest" />

// Extend Jest types
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
