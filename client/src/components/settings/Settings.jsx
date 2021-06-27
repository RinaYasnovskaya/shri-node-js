import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { mainPage } from '../../reducer';
import { Field, reduxForm } from 'redux-form'
import './settings.scss';
import { postSettingsAsync } from '../../actions';

const validate = values => {
  const errors = {};
  if (!values.repoName) {
    errors.repoName = 'Required';
  } else if (!values.buildCommand) {
    errors.buildCommand = 'Required';
  } else if (+values.time < 0) {
    errors.time = 'err';
  }
  return errors;
}

const renderField = ({
  input,
  placeholder,
  type,
  id,
  name,
  meta: { touched, error }
}) => {
  const styles = (touched && error) ? {borderColor: 'red'} : {};

  return (
    <input {...input} style={styles} id={id} name={name} placeholder={placeholder} type={type} />
  )
}

const SettingsForm = () => {
  const [disabled, setDisabled] = useState(false);
  const [isFullData, setIsFullData] = useState(true);

  const dispatch = useDispatch();
  const { settings } = useSelector((state) => state.form);
  const settingsIsDone = useSelector((state) => state.main.settingsIsDone);

  const onClickCancel = (e) => {
    e.preventDefault();
    dispatch(mainPage());
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (settings.values) {
      const { buildCommand, mainBranch, repoName, time } = settings.values;

      if (buildCommand && repoName && +time >= 0 ) {
        const result = {
          mainBranch: mainBranch ? mainBranch : 'main',
          buildCommand,
          repoName,
          period: time ? time : 100,
        };
        setDisabled(true);
        dispatch(postSettingsAsync(result, setDisabled));
      }
    } else {
      setIsFullData(false);
      setTimeout(() => {
        setIsFullData(true);
      }, 2000);
    }
  };

  return (
    <form action="" className="form">
      <div className="form__title">
        <p className="form__title-main" id="title_settings">Settings</p>
        <p className="form__title-description" id="description_settings">
          Configure repository connection and synchronization settings.
        </p>
      </div>
      <div className="form__inner">
        <label htmlFor="repo-name">
          GitHub repository <span className="red-star">*</span>
        </label>
        <Field name="repoName" component={renderField} type="text" placeholder="user-name/repo-name" />
        <label id="build_command">
          Build Command <span className="red-star">*</span>
        </label>
        <Field name="buildCommand" id="build-command" component={renderField} type="text" placeholder="build command: npm start" />
        <label htmlFor="main-branch">Main Branch</label>
        <Field name="mainBranch" id="main-branch" component={renderField} type="text" placeholder="main branch: main" />
        <label htmlFor="time">
          Synchronize every <Field name="time" id="time" component={renderField} min="0" type="number" /> minutes
        </label>
      </div>
        <button disabled={disabled} className="button button_bright submit" onClick={submitForm}>Save</button>
        <button disabled={disabled} className="button button_light cancel" onClick={onClickCancel}>
          <Link to="/">Cancel</Link>
        </button>
        { (settingsIsDone === 'error') && <span className="modal-error">Error to save settings</span> }
        { (settingsIsDone === 'done') &&  <span className="modal-success">Success</span> }
        { !isFullData && <span className="modal-error">Required fields are empty</span> }
    </form>
  );
};

export const Settings = reduxForm({
  form: 'settings',
  validate
})(SettingsForm);
