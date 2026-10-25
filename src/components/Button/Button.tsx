import type { ButtonHTMLAttributes, ReactNode } from 'react';
import '../../styles/components.css';

export type ButtonVariant = 'primary' | 'secondary' | 'danger';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Визуальный стиль кнопки. */
  variant?: ButtonVariant;
  /** Содержимое кнопки. */
  children: ReactNode;
}

/**
 * Базовая кнопка. По умолчанию имеет `type="button"`, чтобы не отправлять
 * формы случайно. Для отправки формы передайте `type="submit"` явно.
 */
export function Button({ variant = 'primary', className, type = 'button', children, ...rest }: ButtonProps) {
  const classes = ['uk-button', `uk-button--${variant}`, className].filter(Boolean).join(' ');

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
