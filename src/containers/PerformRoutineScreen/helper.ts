import isEqual from 'lodash/isEqual';
import Sound from 'react-native-sound';
import { Exercise, Routine } from '../../core/typings';
import { State } from './typings';

let begin, change, next, takeBreak, interval, finished;

export const soundMap = {
  begin,
  change,
  next,
  interval,
  finished,
  break: takeBreak,
};

export function initializeSounds() {
  Sound.setCategory('Playback');

  const soundKeys = Object.keys(soundMap);

  soundKeys.forEach(key => {
    soundMap[key] = new Sound(
      `${key}.mp3`,
      Sound.MAIN_BUNDLE,
      (error: Error): void => {
        console.log('cannot play the sound file', error);
      },
    );
  });
}

export function playSound(soundName): void {
  soundName.play((success: boolean) => {
    if (success) {
      console.log('successfully finished playing');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
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
