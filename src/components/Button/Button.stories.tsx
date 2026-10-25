import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Компоненты/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Сохранить',
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary', 'danger'],
      description: 'Визуальный стиль кнопки',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: 'primary' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Отмена' },
};

export const Danger: Story = {
  args: { variant: 'danger', children: 'Удалить' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
