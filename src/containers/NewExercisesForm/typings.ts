import { Exercise } from '../../core/typings';

export interface ExerciseValues {
  name: string;
  numReps: string;
  repLengthSeconds: string;
  breakLengthSeconds: string;
}

export interface FormattedExerciseValues {
  name: string;
  numReps: number;
  repLengthSeconds: number;
  breakLengthSeconds: number;
}

export interface RoutineValues {
  name: string;
  exercises: Exercise[];
  exerciseToAdd: Exercise;
}
