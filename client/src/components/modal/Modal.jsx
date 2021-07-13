import React from 'react';
import './modal.scss';
import { ModalForm } from './ModalForm';

export const Modal = ({ isOpen, onCancel }) => {
  return (
    <>
    {
      isOpen && <div className="modal">
        <ModalForm onCancel={onCancel} />
      </div>
    }
    </>
  )
}
