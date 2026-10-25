import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button/Button';
import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Компоненты/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Закрывается по Escape и кнопке «Закрыть». Фокус удерживается внутри окна и возвращается на исходный элемент.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Открыть окно
      </Button>
      <Modal open={open} title="Подтверждение" onClose={() => setOpen(false)}>
        <p>Вы уверены, что хотите продолжить?</p>
        <div className="uk-modal__actions">
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Отмена
          </Button>
          <Button onClick={() => setOpen(false)}>Продолжить</Button>
        </div>
      </Modal>
    </>
  );
}

export const Interactive: Story = {
  name: 'Интерактивное окно',
  render: () => <ModalDemo />,
};
