import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { runBuild } from '../../actions';

const ModalFormFields = ({ onCancel }) => {
  const { modal } = useSelector((state) => state.form);
  const history = useHistory();
  const dispatch = useDispatch();

  const onStartBuild = (e) => {
    e.preventDefault();
    if (modal.values.hash) {
      dispatch(runBuild(modal.values.hash, history));
    }
  }

  return (
    <form className="modal__inner">
      <h3 className="modal__title">New Build</h3>
      <span className="modal__description">Enter the commit hash which you want to build.</span>
      <Field name="hash" component="input" type="text" className="modal__input" placeholder="Commit hash" />
      <input type="submit" className="button button_bright" value="Run build" onClick={onStartBuild} />
      <input type="button" className="button button_light" value="Cancel" onClick={onCancel} />
    </form>
  )
}

export const ModalForm = reduxForm({
  form: 'modal'
})(ModalFormFields);
