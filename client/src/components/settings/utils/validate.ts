interface Values {
  [key: string]: string;
}

export const validate = (values: Values) => {
  const errors: Values = {};
  if (!values.repoName) {
    errors.repoName = 'Required';
  } else if (!values.buildCommand) {
    errors.buildCommand = 'Required';
  } else if (+values.time < 0) {
    errors.time = 'err';
  }
  return errors;
};
