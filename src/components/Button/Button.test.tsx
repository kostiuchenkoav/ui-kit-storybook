import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders as type="button" by default so it does not submit forms', () => {
    render(<Button>Сохранить</Button>);
    expect(screen.getByRole('button', { name: 'Сохранить' })).toHaveAttribute('type', 'button');
  });

  it('applies the variant class', () => {
    render(<Button variant="danger">Удалить</Button>);
    expect(screen.getByRole('button')).toHaveClass('uk-button--danger');
  });

  it('calls onClick when pressed', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Нажми</Button>);

    await user.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not fire onClick when disabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>Нажми</Button>);

    await user.click(screen.getByRole('button'));

    expect(onClick).not.toHaveBeenCalled();
  });
});
