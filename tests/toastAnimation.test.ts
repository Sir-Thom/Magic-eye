import { expect, test, describe } from 'vitest';
import { toastAnimationAppear } from '../src/utils/animation/toastAnimation';

describe('Toast Animation Appear', () => {
  test('has a hidden state with correct properties', () => {
    const hiddenState = toastAnimationAppear.hidden;

    expect(hiddenState).toBeTruthy();
    expect(hiddenState.y).toBe('100vh');
    // Add more assertions for other properties as needed
  });

  test('has a visible state with correct properties', () => {
    const visibleState = toastAnimationAppear.visible;

    expect(visibleState).toBeTruthy();
    expect(visibleState.y).toBe('0');
    // Add more assertions for other properties as needed
  });

  test('has an exit state with correct properties', () => {
    const exitState = toastAnimationAppear.exit;

    expect(exitState).toBeTruthy();
    expect(exitState.y).toBe('100vh');
    // Add more assertions for other properties as needed
  });
});
