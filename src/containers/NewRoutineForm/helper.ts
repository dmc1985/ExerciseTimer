import { Errors } from './typings';
import { ExerciseValues } from '../NewExercisesForm/typings';

interface Values extends Pick<ExerciseValues, 'name'> {}

export function validate(values: Values): Errors {
  const errors: Errors = {};
  if (!values.name) {
    errors.name = 'A rouine name is required';
  }
  return errors;
}
