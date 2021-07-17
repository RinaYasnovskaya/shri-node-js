import * as React from 'react';
import './modal.scss';
import { ModalForm } from './ModalForm';

export interface ModalProps {
  isOpen: boolean;
  onCancelModal: () => any;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onCancelModal }) => {
  return (
    <>
    {
      isOpen && <div className="modal">
        {/* тут проблемка :) */}
        {/* <ModalForm onCancelModal={onCancelModal} /> */}
      </div>
    }
    </>
  )
}
