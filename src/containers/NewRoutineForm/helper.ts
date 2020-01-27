import { Exercise } from '../../core/typings';
import { Errors, Values } from './typings';

export const blankExercise: Exercise = {
  name: '',
  numReps: 0,
  repLengthSeconds: 0,
  breakLengthSeconds: 0,
};

export function validateNewRoutine(values: Values): Errors {
  const errors: Errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }
  if (!values.exercises.length) {
    errors.exercises = 'A routine must have at least one exercise';
  }
  if (!values.exerciseToAdd.name) {
    errors.exerciseToAdd.name = 'A name is required';
  }
  if (!values.exerciseToAdd.numReps) {
    errors.exerciseToAdd.numReps = 'Number of reps is required';
  }
  if (isNaN(values.exerciseToAdd.numReps)) {
    errors.exerciseToAdd.numReps = 'Number of reps must be a number';
  }
  if (!values.exerciseToAdd.repLengthSeconds) {
    errors.exerciseToAdd.repLengthSeconds = 'The length of the rep is required';
  }
  if (isNaN(values.exerciseToAdd.repLengthSeconds)) {
    errors.exerciseToAdd.repLengthSeconds = 'Length of a rep must be a number';
  }
  if (!values.exerciseToAdd.breakLengthSeconds) {
    errors.exerciseToAdd.breakLengthSeconds =
      'The length of the break is required';
  }
  if (isNaN(values.exerciseToAdd.breakLengthSeconds)) {
    errors.exerciseToAdd.breakLengthSeconds =
      'Length of a break must be a number';
  }
  return errors;
}

export function validateNewExercise(exerciseToAdd: Exercise): boolean {
  const newExerciseKeys: string[] = Object.keys(exerciseToAdd);

  return newExerciseKeys.reduce((isValid: boolean, key: string) => {
    if (!exerciseToAdd[key]) {
      isValid = false;
      return isValid;
    }
    return isValid;
  }, true);
}
