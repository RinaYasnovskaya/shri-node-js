import React from 'react';
import './modal.scss';

export const Modal = ({ isOpen, onCancel }) => {
  return (
    <>
    {
      isOpen && <div className="modal">
        <div className="modal__inner">
          <h3 className="modal__title">New Build</h3>
          <span className="modal__description">Enter the commit hash which you want to build.</span>
          <input type="text" className="modal__input" placeholder="Commit hash" />
          <input type="submit" className="button button_bright" value="Run build" />
          <input type="button" className="button button_light" value="Cancel" onClick={onCancel} />
        </div>
      </div>
    }
    </>
  )
}
