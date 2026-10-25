/**
 * Русификация встроенного интерфейса Storybook (боковая панель, документация, панель доступности).
 * Storybook не переводит свои подписи, поэтому точные тексты заменяются в DOM.
 * Словарь общий для интерфейса (manager) и превью (iframe), так как документация работает в превью.
 */

const EXACT: Record<string, string> = {
  // Боковая панель и вкладки
  'Find components': 'Найти компонент',
  Docs: 'Документация',
  Canvas: 'Песочница',
  Stories: 'Истории',
  STORIES: 'ИСТОРИИ',
  Usage: 'Использование',
  Controls: 'Элементы управления',
  Actions: 'Действия',
  Accessibility: 'Доступность',
  Interactions: 'Взаимодействия',
  keys: 'ключей',
  Addons: 'Дополнения',
  // Документация
  'Show code': 'Показать код',
  'Hide code': 'Скрыть код',
  Copy: 'Копировать',
  Name: 'Название',
  Description: 'Описание',
  Default: 'По умолчанию',
  Control: 'Управление',
  Type: 'Тип',
  'Set string': 'Задать строку',
  'Set object': 'Задать объект',
  'Set boolean': 'Задать логическое значение',
  RAW: 'ИСХОДНИК',
  // Меню настроек
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
  // Панель доступности (axe)
  Violations: 'Нарушения',
  Passes: 'Пройдено',
  Incomplete: 'Требует проверки',
  'Highlight results': 'Подсветить результаты',
  'More info...': 'Подробнее...',
  Serious: 'Серьёзно',
  Critical: 'Критично',
  Moderate: 'Умеренно',
  Minor: 'Незначительно',
  'Element is hidden': 'Элемент скрыт',
  'No accessibility violations found.': 'Нарушений доступности не найдено.',
  'Tests completed': 'Тесты пройдены',
  'Skip to sidebar': 'Перейти к боковой панели',
  'Skip to canvas': 'Перейти к песочнице',
  'Search for components': 'Поиск компонентов',
  'Tests failed': 'Тесты не пройдены',
  'Running tests': 'Запуск тестов',
  'Buttons must have discernible text': 'У кнопок должен быть различимый текст',
  'Elements must meet minimum color contrast ratio thresholds': 'Элементы должны соответствовать минимальному контрасту',
  'Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds':
    'Контраст между текстом и фоном должен соответствовать WCAG 2 AA',
  'Interactive controls must not be nested': 'Интерактивные элементы не должны быть вложены друг в друга',
  'aria-hidden="true" must not be present on the document body': 'Атрибут aria-hidden="true" не должен быть на теле документа',
  'ARIA hidden element must not be focusable or contain focusable elements':
    'Скрытый элемент ARIA не должен фокусироваться и не должен содержать фокусируемых элементов',
};

/** Шаблоны для текстов с переменными частями. */
const PATTERNS: Array<[RegExp, string]> = [
  [/Element has sufficient color contrast of ([\d.]+)/, 'Достаточный цветовой контраст: $1'],
  [/(\d+) keys/, '$1 ключей'],
];

const ATTRIBUTES = ['placeholder', 'title', 'aria-label'];

function translateTextNodes(root: Node) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) {
    const value = node.nodeValue ?? '';
    const key = value.trim();
    let next = value;
    if (EXACT[key]) {
      next = value.replace(key, EXACT[key]);
    } else {
      for (const [pattern, replacement] of PATTERNS) next = next.replace(pattern, replacement);
    }
    if (next !== value) node.nodeValue = next;
    node = walker.nextNode();
  }
}

function translateAttributes(root: ParentNode) {
  root.querySelectorAll(ATTRIBUTES.map((name) => `[${name}]`).join(',')).forEach((el) => {
    for (const name of ATTRIBUTES) {
      const value = el.getAttribute(name);
      if (value && EXACT[value.trim()] && value.trim() !== EXACT[value.trim()]) {
        el.setAttribute(name, EXACT[value.trim()]);
      }
    }
  });
}

/** Подключает перевод к документу и следит за изменениями, которые делает React. */
export function mountTranslator(doc: Document) {
  const run = () => {
    if (!doc.body) return;
    translateTextNodes(doc.body);
    translateAttributes(doc.body);
  };
  const start = () => {
    run();
    new MutationObserver(run).observe(doc.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ATTRIBUTES,
    });
  };
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', start);
  else start();
}
