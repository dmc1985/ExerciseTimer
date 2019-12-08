export interface Exercise {
  name: string;
  numReps: number;
  repLengthSeconds: number;
  breakLengthSeconds: number;
}

export interface Routine {
  name: string;
  exercises: Exercise[];
}

export const sampleExercise = {
  name: 'angel of death',
  numReps: 10,
  repLengthSeconds: 5,
  breakLengthSeconds: 5,
};

export const sampleRoutine = {
  name: 'sample routine',
  exercises: [sampleExercise],
};
