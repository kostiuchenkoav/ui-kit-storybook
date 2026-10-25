import type { Preview } from '@storybook/react';
import '../src/styles/tokens.css';
import { mountTranslator } from './i18n';

// Документация и песочница Storybook белые, поэтому цвета фиксируются светлыми.
// Тёмная тема библиотеки остаётся доступной в приложениях через системную настройку или data-theme="dark".
document.documentElement.setAttribute('data-theme', 'light');
mountTranslator(document);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'error',
    },
  },
};

export default preview;
