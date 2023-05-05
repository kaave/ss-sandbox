/*
 * Note: globals: true を付与しない場合は以下。
 * ただしその場合、一部の非同期Reactコンポーネントテストの挙動がおかしい。
 * import matchers from '@testing-library/jest-dom/matchers';
 */
// import { expect } from 'vitest';
// expect.extend(matchers);

import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// fetch を上書きしないと msw がうまく動作しない
import { fetch } from 'cross-fetch';
global.fetch = fetch;

afterEach(() => {
  cleanup();
});
