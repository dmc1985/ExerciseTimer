import { Exercise } from '../../core/typings';

export interface ExerciseValues {
  name: string;
  numReps: string;
  repLengthSeconds: string;
  breakLengthSeconds: string;
  secondsBeforeNextExercise: string;
}

export interface FormattedExerciseValues {
  name: string;
  numReps: number;
  repLengthSeconds: number;
  breakLengthSeconds: number;
  secondsBeforeNextExercise: number;
}

export interface RoutineValues {
  name: string;
  secondsBetweenExercises: string;
  exercises: Exercise[];
  exerciseToAdd: Exercise;
}
