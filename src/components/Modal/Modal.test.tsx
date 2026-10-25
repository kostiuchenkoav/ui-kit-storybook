import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from './Modal';

function setup(onClose = vi.fn()) {
  render(
    <>
      <button type="button">Внешняя кнопка</button>
      <Modal open title="Подтверждение" onClose={onClose}>
        <button type="button">Отмена</button>
        <button type="button">Продолжить</button>
      </Modal>
    </>,
  );
  return { onClose };
}

describe('Modal', () => {
  it('renders nothing when closed', () => {
    render(
      <Modal open={false} title="Скрыто" onClose={() => {}}>
        <p>Текст</p>
      </Modal>,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('exposes an accessible dialog named by its title', () => {
    setup();
    expect(screen.getByRole('dialog', { name: 'Подтверждение' })).toBeInTheDocument();
  });

  it('moves focus inside the dialog when it opens', () => {
    setup();
    expect(screen.getByRole('button', { name: 'Отмена' })).toHaveFocus();
  });

  it('closes on Escape', async () => {
    const user = userEvent.setup();
    const { onClose } = setup();

    await user.keyboard('{Escape}');

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('keeps Tab focus trapped inside the dialog', async () => {
    const user = userEvent.setup();
    setup();

    await user.tab();
    expect(screen.getByRole('button', { name: 'Продолжить' })).toHaveFocus();

    // Фокус должен вернуться к первому элементу, а не уйти за пределы окна.
    await user.tab();
    expect(screen.getByRole('button', { name: 'Отмена' })).toHaveFocus();
  });
});
