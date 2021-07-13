import React from 'react';

export const renderField = ({
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
};
