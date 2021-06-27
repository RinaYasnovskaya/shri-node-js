import React from 'react';
import './modal.scss';
import { ModalForm } from './ModalForm';

export const Modal = ({ isOpen, onCancel }) => {

  /**
   * TODO:
   * 1. вставляем хэш в поле модалки
   * 2. отправляем запрос, получаем айдишник
   * 3. перенаправляем на страницу с этим айдишником builds/buildid =>
   * 4. там берем айдишник из юрл, запрос на информацию + логи
   */

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
