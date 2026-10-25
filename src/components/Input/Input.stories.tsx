import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Компоненты/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    label: 'Электронная почта',
    placeholder: 'name@example.com',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = { name: 'По умолчанию' };;

export const WithHint: Story = {
  name: 'С подсказкой',
  args: { hint: 'Мы не будем отправлять спам.' },
};

export const WithError: Story = {
  name: 'С ошибкой',
  args: { error: 'Введите корректный адрес почты.', defaultValue: 'not-an-email' },
};
