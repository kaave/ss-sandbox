import type { Preview } from '@storybook/react';
import { initialize as initializeMsw, mswDecorator } from 'msw-storybook-addon';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};


initializeMsw();
// Provide the MSW addon decorator globally
export const decorators = [mswDecorator];

export default preview;
