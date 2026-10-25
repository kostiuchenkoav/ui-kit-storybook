import { useId, useRef, useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';
import '../../styles/components.css';

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  /** Идентификатор вкладки, открытой при первом рендере. По умолчанию первая. */
  defaultTabId?: string;
  /** Подпись для группы вкладок, нужна программам чтения с экрана. */
  label: string;
}

/**
 * Вкладки по ARIA Authoring Practices: стрелки переключают вкладки,
 * Home и End переходят к первой и последней, Tab уводит фокус в панель.
 */
export function Tabs({ items, defaultTabId, label }: TabsProps) {
  const baseId = useId();
  const [selected, setSelected] = useState(defaultTabId ?? items[0]?.id);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  function focusTab(index: number) {
    const next = items[(index + items.length) % items.length];
    setSelected(next.id);
    tabRefs.current[next.id]?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        focusTab(index + 1);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        focusTab(index - 1);
        break;
      case 'Home':
        event.preventDefault();
        focusTab(0);
        break;
      case 'End':
        event.preventDefault();
        focusTab(items.length - 1);
        break;
    }
  }

  return (
    <div>
      <div role="tablist" aria-label={label} className="uk-tabs__list">
        {items.map((item, index) => {
          const isSelected = item.id === selected;
          return (
            <button
              key={item.id}
              ref={(node) => {
                tabRefs.current[item.id] = node;
              }}
              id={`${baseId}-tab-${item.id}`}
              type="button"
              role="tab"
              className="uk-tab"
              aria-selected={isSelected}
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => setSelected(item.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          id={`${baseId}-panel-${item.id}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${item.id}`}
          className="uk-tabs__panel"
          hidden={item.id !== selected}
          tabIndex={0}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
