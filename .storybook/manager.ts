import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';
import { mountTranslator } from './i18n';

// Название в шапке боковой панели. Тема выбирается так же, как по умолчанию: по системной настройке.
const isDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;

addons.setConfig({
  theme: { ...(isDark ? themes.dark : themes.light), brandTitle: 'UI-библиотека' },
});

if (typeof document !== 'undefined') mountTranslator(document);
