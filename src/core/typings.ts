export interface Exercise {
  name: string;
  numReps: number;
  repLengthSeconds: number;
  breakLengthSeconds: number;
  secondsBeforeNextExercise: number;
}

export interface Routine {
  name: string;
  exercises: Exercise[];
  secondsBetweenExercises: number;
}

export const sampleExercise: Exercise = {
  name: 'angel of death',
  numReps: 10,
  repLengthSeconds: 5,
  breakLengthSeconds: 5,
  secondsBeforeNextExercise: 3,
};

export const sampleRoutine: Routine = {
  name: 'sample routine',
  exercises: [sampleExercise],
  secondsBetweenExercises: 3,
};
