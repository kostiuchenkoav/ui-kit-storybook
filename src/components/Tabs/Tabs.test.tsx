import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs } from './Tabs';

const items = [
  { id: 'a', label: 'Первая', content: 'Содержимое А' },
  { id: 'b', label: 'Вторая', content: 'Содержимое Б' },
  { id: 'c', label: 'Третья', content: 'Содержимое В' },
];

describe('Tabs', () => {
  it('selects the first tab by default and shows its panel', () => {
    render(<Tabs label="Разделы" items={items} />);
    expect(screen.getByRole('tab', { name: 'Первая' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel', { name: 'Первая' })).toBeVisible();
  });

  it('respects defaultTabId', () => {
    render(<Tabs label="Разделы" items={items} defaultTabId="b" />);
    expect(screen.getByRole('tab', { name: 'Вторая' })).toHaveAttribute('aria-selected', 'true');
  });

  it('moves selection with arrow keys, wrapping at the ends', async () => {
    const user = userEvent.setup();
    render(<Tabs label="Разделы" items={items} />);

    screen.getByRole('tab', { name: 'Первая' }).focus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Вторая' })).toHaveAttribute('aria-selected', 'true');

    await user.keyboard('{ArrowLeft}{ArrowLeft}');
    expect(screen.getByRole('tab', { name: 'Третья' })).toHaveAttribute('aria-selected', 'true');
  });

  it('jumps to first and last tabs with Home and End', async () => {
    const user = userEvent.setup();
    render(<Tabs label="Разделы" items={items} />);

    screen.getByRole('tab', { name: 'Первая' }).focus();
    await user.keyboard('{End}');
    expect(screen.getByRole('tab', { name: 'Третья' })).toHaveAttribute('aria-selected', 'true');

    await user.keyboard('{Home}');
    expect(screen.getByRole('tab', { name: 'Первая' })).toHaveAttribute('aria-selected', 'true');
  });

  it('only the selected tab is in the tab order', () => {
    render(<Tabs label="Разделы" items={items} />);
    expect(screen.getByRole('tab', { name: 'Первая' })).toHaveAttribute('tabindex', '0');
    expect(screen.getByRole('tab', { name: 'Вторая' })).toHaveAttribute('tabindex', '-1');
  });
});
