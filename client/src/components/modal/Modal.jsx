import React from 'react';
import './modal.scss';
import { ModalForm } from './ModalForm';

export const Modal = ({ isOpen, onCancel }) => {
  return (
    <>
    {
      isOpen && <div data-testid="wndw-modal" className="modal">
        <ModalForm onCancel={onCancel} />
      </div>
    }
    </>
  )
}
