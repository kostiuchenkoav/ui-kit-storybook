import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  it('links the visible label to the input', () => {
    render(<Input label="Имя" />);
    expect(screen.getByLabelText('Имя')).toBeInTheDocument();
  });

  it('connects hint and error through aria-describedby', () => {
    render(<Input label="Почта" hint="Например, name@example.com" error="Неверный адрес" />);
    const input = screen.getByLabelText('Почта');

    const describedBy = input.getAttribute('aria-describedby')?.split(' ') ?? [];
    expect(describedBy).toHaveLength(2);
    expect(describedBy.map((id) => document.getElementById(id)?.textContent)).toEqual([
      'Например, name@example.com',
      'Неверный адрес',
    ]);
  });

  it('marks the field as invalid when there is an error', () => {
    render(<Input label="Почта" error="Ошибка" />);
    expect(screen.getByLabelText('Почта')).toHaveAttribute('aria-invalid', 'true');
  });

  it('announces the error with role="alert"', () => {
    render(<Input label="Почта" error="Ошибка" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Ошибка');
  });
});
