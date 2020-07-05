import isEqual from 'lodash/isEqual';
import SoundPlayer from 'react-native-sound-player';
import { Exercise, Routine } from '../../core/typings';
import { State } from './typings';

export function playSound(fileName: string, fileType: string = 'mp3') {
  try {
    SoundPlayer.playSoundFile(fileName, fileType);
  } catch (e) {
    console.log('cannot play the sound file', e);
  }
}

const PREROUTINE_COUNTDOWN_DURATION_SECONDS: number = 3;

interface CurrentExerciseParams {
  routine: Routine;
  currentExercise: Exercise;
}

export function getCurrentExerciseIndex({
  routine,
  currentExercise,
}: CurrentExerciseParams): number {
  return routine.exercises.findIndex((exercise: Exercise) =>
    isEqual(exercise, currentExercise),
  );
}

interface TimerDurationParams
  extends Pick<
    State,
    | 'isPreroutineCountdown'
    | 'isRepBreak'
    | 'isExerciseBreak'
    | 'currentExercise'
  > {}

export function getTimerDuration({
  isPreroutineCountdown,
  isRepBreak,
  isExerciseBreak,
  currentExercise,
}: TimerDurationParams): number {
  if (isPreroutineCountdown) {
    return PREROUTINE_COUNTDOWN_DURATION_SECONDS;
  }
  if (isExerciseBreak) {
    return currentExercise.secondsBeforeNextExercise;
  }
  if (isRepBreak) {
    return currentExercise.breakLengthSeconds;
  }
  return currentExercise.repLengthSeconds;
}

export function getNextExercise({
  routine,
  currentExercise,
}: CurrentExerciseParams): Exercise {
  const currentIndex: number = getCurrentExerciseIndex({
    routine,
    currentExercise,
  });

  if (currentIndex === -1 || currentIndex + 1 >= routine.exercises.length) {
    return routine.exercises[0];
  }
  return routine.exercises[currentIndex + 1];
}

export function getPreviousExercise({
  routine,
  currentExercise,
}: CurrentExerciseParams): Exercise {
  const currentIndex: number = getCurrentExerciseIndex({
    routine,
    currentExercise,
  });

  if (currentIndex === -1 || currentIndex === 0) {
    return routine.exercises[routine.exercises.length - 1];
  }
  return routine.exercises[currentIndex - 1];
}
