# UI-библиотека компонентов

Небольшая библиотека React-компонентов на TypeScript с упором на доступность. Все компоненты описаны в Storybook, покрыты тестами и проверяются на нарушения правил доступности (axe) прямо в браузере.

> **Storybook:** _добавьте ссылку на опубликованный Storybook после деплоя_

## Состав

| Компонент | Что умеет |
|---|---|
| `Button` | Варианты `primary`, `secondary`, `danger`; по умолчанию `type="button"` |
| `Input` | Подпись, подсказка и ошибка, связанные через `aria-describedby` |
| `Modal` | Ловушка фокуса, закрытие по Escape и клику на оверлей, возврат фокуса |
| `Tabs` | Клавиатурная навигация по ARIA Authoring Practices: стрелки, Home, End |

Стили находятся в CSS-токенах `--uk-*`, их можно переопределить под свой бренд.

## Стек

- React 18, TypeScript в строгом режиме
- Vite в библиотечном режиме (ES-модуль и `.d.ts`)
- Storybook 8 с аддонами Essentials, Interactions и a11y
- Vitest и Testing Library

## Установка и запуск

Требования: Node.js 20 или новее.

```bash
npm install
npm run storybook      # документация и песочница на http://localhost:6006
npm test               # тесты компонентов
npm run build          # сборка библиотеки в dist/ и проверка типов
npm run build-storybook
```

## Использование

```tsx
import { Button, Input, Modal, Tabs } from '@kostiuchenkoav/ui-kit';
import '@kostiuchenkoav/ui-kit/styles.css';

export function Example() {
  return (
    <>
      <Input label="Почта" hint="Например, name@example.com" />
      <Button variant="primary">Сохранить</Button>
    </>
  );
}
```

## Доступность

- У каждого поля есть видимая подпись, ошибки объявляются через `role="alert"`.
- Модальное окно удерживает фокус и возвращает его на исходный элемент.
- Вкладки переключаются стрелками, Home и End, в порядке табуляции есть только активная вкладка.
- В Storybook включён аддон a11y с режимом `test: 'error'`: любое нарушение axe видно сразу.

## Тестирование

```bash
npm test
```

Тесты проверяют поведение, а не реализацию: подписи, клавиатуру, фокус, `aria-*` и вызовы обработчиков.

## Структура проекта

```
src/
  components/
    Button/    Button.tsx, стори, тесты, MDX-документация
    Input/     Input.tsx, стори, тесты
    Modal/     Modal.tsx, стори, тесты
    Tabs/      Tabs.tsx, стори, тесты
  styles/
    tokens.css       CSS-переменные (цвета, отступы, радиусы)
    components.css   Стили компонентов
  index.ts           Публичный API библиотеки
.storybook/          Конфигурация Storybook
```

## Публикация

Пакет настроен под публикацию в npm (поля `exports`, `types`, `files`). Для выпуска версии:

```bash
npm run build
npm publish --access public
```

Перед публикацией обновите версию в `package.json`.

## Лицензия

[MIT](LICENSE)
