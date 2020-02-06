import { Errors, NewExerciseValues } from './typings';

interface Values extends Pick<NewExerciseValues, 'name'> {}

export function validate(values: Values): Errors {
  const errors: Errors = {};
  if (!values.name) {
    errors.name = 'A rouine name is required';
  }
  return errors;
}
