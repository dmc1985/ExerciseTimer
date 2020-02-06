import { Errors } from '../NewRoutineForm/typings';
import { Exercise } from '../../core/typings';
import { ExerciseValues, FormattedExerciseValues } from './typings';
import { NewExerciseValues } from './index';

export const blankExercise: Exercise = {
  name: '',
  numReps: 0,
  repLengthSeconds: 0,
  breakLengthSeconds: 0,
};

export function validate(values: NewExerciseValues): Errors {
  const errors: Errors = {};
  if (!values.exercises.length) {
    errors.exercises = 'A routine must have at least one exercise';
  }
  return errors;
}

export type ExerciseErrors = {
  name?: string;
  numReps?: string;
  repLengthSeconds?: string;
  breakLengthSeconds?: string;
};

export function validateExercise(values: ExerciseValues): ExerciseErrors {
  const errors: ExerciseErrors = {};
  if (!values.name) {
    errors.name = 'An exercise name is required';
  }
  if (!values.numReps) {
    errors.numReps = 'Number of reps is required';
  }
  if (isNaN(+values.numReps)) {
    errors.numReps = 'Number of reps must be a number';
  }
  if (!values.repLengthSeconds) {
    errors.repLengthSeconds = 'The length of the rep is required';
  }
  if (isNaN(+values.repLengthSeconds)) {
    errors.repLengthSeconds = 'Length of a rep must be a number';
  }
  if (!values.breakLengthSeconds) {
    errors.breakLengthSeconds = 'The length of the break is required';
  }
  if (isNaN(+values.breakLengthSeconds)) {
    errors.breakLengthSeconds = 'Length of a break must be a number';
  }
  return errors;
}

export function formatExerciseValues(
  values: ExerciseValues,
): FormattedExerciseValues {
  const result: FormattedExerciseValues = { name: values.name };
  const numericInputs: string[] = [
    'numReps',
    'repLengthSeconds',
    'breakLengthSeconds',
  ];

  numericInputs.forEach(
    (input: string): void => {
      result[input] = +values[input];
    },
  );

  return result;
}
