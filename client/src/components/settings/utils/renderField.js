import React from 'react';

export const renderField = ({
  input,
  placeholder,
  type,
  id,
  meta: { touched, error }
}) => {
  const styles = (touched && error) ? {borderColor: 'red'} : {};

  return (
    <input {...input} style={styles} id={id} placeholder={placeholder} type={type} />
  )
};
