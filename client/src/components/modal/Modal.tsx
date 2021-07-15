import * as React from 'react';
import './modal.scss';
import { ModalForm } from './ModalForm';

interface ModalProps {
  isOpen: boolean;
  onCancel: () => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onCancel }) => {
  return (
    <>
    {
      isOpen && <div className="modal">
        //TODO: wtf вообще
        {/* <ModalForm onCancel={onCancel} /> */}
      </div>
    }
    </>
  )
}
