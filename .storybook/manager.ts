import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';

// Название в шапке боковой панели. Тема выбирается так же, как по умолчанию: по системной настройке.
const isDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;

addons.setConfig({
  theme: { ...(isDark ? themes.dark : themes.light), brandTitle: 'UI-библиотека' },
});

// Встроенный интерфейс Storybook не переводится. Заменяем точные подписи элементов в DOM.
const RU: Record<string, string> = {
  Docs: 'Документация',
  Canvas: 'Песочница',
  Controls: 'Элементы управления',
  Actions: 'Действия',
  Accessibility: 'Доступность',
  Interactions: 'Взаимодействия',
  Name: 'Название',
  Control: 'Управление',
  'About your Storybook': 'О Storybook',
  Documentation: 'Документация',
  'Keyboard shortcuts': 'Горячие клавиши',
  'Show sidebar': 'Показать боковую панель',
  'Show toolbar': 'Показать панель инструментов',
  'Show addons': 'Показать дополнения',
  'Change addons orientation': 'Расположение дополнений',
  'Go full screen': 'На весь экран',
  Search: 'Поиск',
  'Previous component': 'Предыдущий компонент',
  'Next component': 'Следующий компонент',
  'Previous story': 'Предыдущая история',
  'Next story': 'Следующая история',
  'Collapse all': 'Свернуть всё',
  'Set object': 'Задать объект',
};

function translateText(root: Node) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) {
    const value = node.nodeValue ?? '';
    const key = value.trim();
    if (key && RU[key]) node.nodeValue = value.replace(key, RU[key]);
    node = walker.nextNode();
  }
  document.querySelectorAll<HTMLInputElement>('input[placeholder="Find components"]').forEach((el) => {
    el.placeholder = 'Найти компонент';
  });
}

if (typeof window !== 'undefined') {
  const start = () => {
    translateText(document.body);
    new MutationObserver(() => translateText(document.body)).observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
}
