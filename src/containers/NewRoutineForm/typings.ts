import { Exercise } from '../../core/typings';

export type Values = {
  name: string;
  exercises: Exercise[];
  exerciseToAdd: Exercise;
};

export type Errors = {
  name?: string;
  exercises?: string;
  exerciseToAdd?: {
    name?: string;
    numReps?: string;
    repLengthSeconds?: string;
    breakLengthSeconds?: string;
  };
};
