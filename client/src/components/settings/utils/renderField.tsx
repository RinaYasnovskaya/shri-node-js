import React from 'react';

interface RenderFieldValues {
  input: any;
  placeholder: string;
  type: string;
  id: string;
  name: string;
  meta: {
    touched: any;
    error: any;
  }
}

export const renderField = ({
  input,
  placeholder,
  type,
  id,
  name,
  meta: { touched, error }
}: RenderFieldValues) => {
  const styles = (touched && error) ? {borderColor: 'red'} : {};

  return (
    <input {...input} style={styles} id={id} name={name} placeholder={placeholder} type={type} />
  )
};
