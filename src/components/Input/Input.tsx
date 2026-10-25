import { useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import '../../styles/components.css';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  /** Видимая подпись поля. Обязательна: без неё поле недоступно для программ чтения с экрана. */
  label: string;
  /** Подсказка под полем. */
  hint?: string;
  /** Текст ошибки. Если указан, поле помечается как некорректное. */
  error?: string;
}

/**
 * Текстовое поле с подписью, подсказкой и ошибкой.
 * Подпись, подсказка и ошибка связаны с полем через `aria-labelledby` и `aria-describedby`.
 */
export function Input({ label, hint, error, ...rest }: InputProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;

  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="uk-field">
      <label className="uk-field__label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className="uk-input"
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy}
        {...rest}
      />
      {hint && (
        <span id={hintId} className="uk-field__hint">
          {hint}
        </span>
      )}
      {error && (
        <span id={errorId} className="uk-field__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
