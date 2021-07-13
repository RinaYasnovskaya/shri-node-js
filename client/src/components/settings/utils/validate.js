export const validate = values => {
  const errors = {};
  if (!values.repoName) {
    errors.repoName = 'Required';
  } else if (!values.buildCommand) {
    errors.buildCommand = 'Required';
  } else if (+values.time < 0) {
    errors.time = 'err';
  }
  return errors;
};
