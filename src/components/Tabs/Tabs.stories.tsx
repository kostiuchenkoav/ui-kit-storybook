import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Компоненты/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  args: {
    label: 'Разделы настроек',
    items: [
      { id: 'profile', label: 'Профиль', content: <p>Имя, фото и контакты.</p> },
      { id: 'security', label: 'Безопасность', content: <p>Пароль и двухфакторная аутентификация.</p> },
      { id: 'billing', label: 'Оплата', content: <p>Способы оплаты и счета.</p> },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = { name: 'По умолчанию' };;

export const StartOnSecondTab: Story = {
  name: 'Открыта вторая вкладка',
  args: { defaultTabId: 'security' },
};
