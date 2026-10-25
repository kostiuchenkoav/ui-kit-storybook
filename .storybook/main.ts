import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  // Генерация .d.ts нужна только для сборки библиотеки. Storybook использует тот же vite.config.ts,
  // поэтому плагин vite-plugin-dts здесь отключаем, иначе сборка падает на чистом клоне без dist/.
  viteFinal: async (config) => ({
    ...config,
    base: './',
    plugins: (config.plugins ?? [])
      .flat()
      .filter((p) => (p as { name?: string } | undefined)?.name !== 'vite:dts'),
  }),
  docs: {
    autodocs: 'tag',
  },
};

export default config;
