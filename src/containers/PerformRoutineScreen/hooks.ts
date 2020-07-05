import isEqual from 'lodash/isEqual';
import { useEffect, useRef, useState } from 'react';
import { Nullable } from '../../common/typings';
import { Exercise, Routine } from '../../core/typings';
import { playSound } from './helper';

export function useInterval(callback: () => any, delay: Nullable<number>) {
  const savedCallback = useRef(null);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export function useTimer(
  repLengthSeconds: number,
  shouldRun: boolean,
  isReset: boolean,
) {
  const [remainingTime, setRemainingTime] = useState<number>(repLengthSeconds);
  if (isReset) {
    setRemainingTime(repLengthSeconds);
  }

  useInterval(
    () => setRemainingTime(+(remainingTime - 1).toFixed(1)),
    remainingTime >= 0 && shouldRun ? 1000 : null,
  );

  return remainingTime;
}

const PREROUTINE_COUNTDOWN_DURATION_SECONDS: number = 3;

export function useExerciseTimer(routine: Routine) {
  const [isPreroutineCountdown, togglePreroutineCountdown] = useState<boolean>(
    true,
  );
  const [currentExercise, setCurrentExercise] = useState<Exercise>(
    routine.exercises[0],
  );
  const [isTimerRunning, toggleTimer] = useState<boolean>(false);
  const [currentRep, setCurrentRep] = useState<number>(1);
  const [isRoutineFinished, toggleRoutineFinished] = useState<boolean>(false);
  const [isReset, toggleReset] = useState<boolean>(false);
  const [isBreak, toggleBreak] = useState<boolean>(false);
  const [isExerciseBreak, toggleExerciseBreak] = useState<boolean>(false);

  const timeRemaining = useTimer(getTimerDuration(), isTimerRunning, isReset);

  function getCurrentExerciseIndex(): number {
    return routine.exercises.findIndex((exercise: Exercise) =>
      isEqual(exercise, currentExercise),
    );
  }

  function getTimerDuration(): number {
    if (isPreroutineCountdown) {
      return PREROUTINE_COUNTDOWN_DURATION_SECONDS;
    }
    if (isExerciseBreak) {
      return currentExercise.secondsBeforeNextExercise;
    }
    if (isBreak) {
      return currentExercise.breakLengthSeconds;
    }
    return currentExercise.repLengthSeconds;
  }

  function getNextExercise(): Exercise {
    const currentIndex: number = getCurrentExerciseIndex();

    if (currentIndex === -1 || currentIndex + 1 >= routine.exercises.length) {
      return routine.exercises[0];
    }
    return routine.exercises[currentIndex + 1];
  }

  function getPreviousExercise(): Exercise {
    const currentIndex: number = getCurrentExerciseIndex();

    if (currentIndex === -1 || currentIndex === 0) {
      return routine.exercises[routine.exercises.length - 1];
    }
    return routine.exercises[currentIndex - 1];
  }

  useEffect(() => {
    if (timeRemaining === 0) {
      if (isPreroutineCountdown) {
        togglePreroutineCountdown(false);
        playSound('begin');
        toggleReset(true);
      }
      if (!isPreroutineCountdown) {
        if (!isExerciseBreak) {
          toggleBreak(!isBreak);
          if (!isBreak) {
            playSound('break');
          }
        }
        toggleReset(true);
        if (isExerciseBreak) {
          setCurrentExercise(getNextExercise());
          setCurrentRep(1);
          toggleReset(true);
          toggleExerciseBreak(false);
          playSound('change');
        }

        if (isBreak) {
          if (currentRep < currentExercise.numReps) {
            setCurrentRep(currentRep + 1);
            toggleReset(true);
            playSound('next');
          } else {
            if (getCurrentExerciseIndex() === routine.exercises.length - 1) {
              toggleRoutineFinished(true);
              toggleTimer(false);
              playSound('finished');
            } else {
              if (!isExerciseBreak) {
                toggleExerciseBreak(true);
                playSound('interval');
                toggleReset(true);
              }
              if (isExerciseBreak) {
                setCurrentExercise(getNextExercise());
                setCurrentRep(1);
                toggleReset(true);
                toggleExerciseBreak(false);
                playSound('change');
              }
            }
          }
        }
      }
    }
  }, [
    timeRemaining,
    isBreak,
    currentRep,
    currentExercise.numReps,
    getNextExercise,
    currentExercise,
    getCurrentExerciseIndex,
    routine.exercises.length,
    isExerciseBreak,
    isPreroutineCountdown,
  ]);

  if (isReset) {
    toggleReset(false);
  }

  return {
    isRoutineFinished,
    isTimerRunning,
    currentExercise,
    currentRep,
    timeRemaining,
    getTimerDuration,
    isBreak,
    isExerciseBreak,
    isPreroutineCountdown,
    toggleReset,
    toggleTimer,
    setCurrentExercise,
    getPreviousExercise,
    getNextExercise,
  };
}
