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

export const Default: Story = {};

export const WithHint: Story = {
  args: { hint: 'Мы не будем отправлять спам.' },
};

export const WithError: Story = {
  args: { error: 'Введите корректный адрес почты.', defaultValue: 'not-an-email' },
};
