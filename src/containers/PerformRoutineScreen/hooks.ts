import isEqual from 'lodash/isEqual';
import { useEffect, useReducer, useRef, useState } from 'react';
import { Nullable } from '../../common/typings';
import { Exercise, Routine } from '../../core/typings';
import { playSound } from './helper';
import { getInitialState, reducer } from './store';
import {
  setCurrentExercise,
  setCurrentRep,
  setIsExerciseBreak,
  setIsPreroutineCountdown,
  setIsRepBreak,
  setIsRoutineFinished,
  setIsTimerRunning,
  setShouldTimerReset,
} from './store/actions';

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
  shouldTimerReset: boolean,
) {
  const [remainingTime, setRemainingTime] = useState<number>(repLengthSeconds);
  if (shouldTimerReset) {
    setRemainingTime(repLengthSeconds);
  }

  useInterval(
    () => setRemainingTime(+(remainingTime - 1).toFixed(1)),
    remainingTime >= 0 && shouldRun ? 1000 : null,
  );

  return remainingTime;
}

const PREROUTINE_COUNTDOWN_DURATION_SECONDS: number = 3;

function getCurrentExerciseIndex({ routine, currentExercise }): number {
  return routine.exercises.findIndex((exercise: Exercise) =>
    isEqual(exercise, currentExercise),
  );
}

export function getTimerDuration({
  isPreroutineCountdown,
  isRepBreak,
  isExerciseBreak,
  currentExercise,
}): number {
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

export function getNextExercise({ routine, currentExercise }): Exercise {
  const currentIndex: number = getCurrentExerciseIndex({
    routine,
    currentExercise,
  });

  if (currentIndex === -1 || currentIndex + 1 >= routine.exercises.length) {
    return routine.exercises[0];
  }
  return routine.exercises[currentIndex + 1];
}

export function getPreviousExercise({ routine, currentExercise }): Exercise {
  const currentIndex: number = getCurrentExerciseIndex({
    routine,
    currentExercise,
  });

  if (currentIndex === -1 || currentIndex === 0) {
    return routine.exercises[routine.exercises.length - 1];
  }
  return routine.exercises[currentIndex - 1];
}

export function useExerciseTimer(routine: Routine) {
  const initialStore = getInitialState(routine.exercises[0]);

  const [store, dispatch] = useReducer(reducer, initialStore);

  const {
    isPreroutineCountdown,
    currentExercise,
    isTimerRunning,
    currentRep,
    shouldTimerReset,
    isRepBreak,
    isExerciseBreak,
  } = store;

  const timeRemaining = useTimer(
    getTimerDuration({
      isPreroutineCountdown,
      isRepBreak,
      isExerciseBreak,
      currentExercise,
    }),
    isTimerRunning,
    shouldTimerReset,
  );

  useEffect(() => {
    if (timeRemaining === 0) {
      if (isPreroutineCountdown) {
        setIsPreroutineCountdown(dispatch, false);
        playSound('begin');
        setShouldTimerReset(dispatch, true);
      }
      if (!isPreroutineCountdown) {
        if (!isExerciseBreak) {
          setIsRepBreak(dispatch, !isRepBreak);
          if (!isRepBreak) {
            playSound('break');
          }
        }
        setShouldTimerReset(dispatch, true);
        if (isExerciseBreak) {
          setCurrentExercise(
            dispatch,
            getNextExercise({ routine, currentExercise }),
          );
          setCurrentRep(dispatch, 1);
          setShouldTimerReset(dispatch, true);
          setIsExerciseBreak(dispatch, false);
          playSound('change');
        }

        if (isRepBreak) {
          if (currentRep < currentExercise.numReps) {
            setCurrentRep(dispatch, currentRep + 1);
            setShouldTimerReset(dispatch, true);
            playSound('next');
          } else {
            if (
              getCurrentExerciseIndex({ routine, currentExercise }) ===
              routine.exercises.length - 1
            ) {
              setIsRoutineFinished(dispatch, true);
              setIsTimerRunning(dispatch, false);
              playSound('finished');
            } else {
              if (!isExerciseBreak) {
                setIsExerciseBreak(dispatch, true);
                playSound('interval');
                setShouldTimerReset(dispatch, true);
              }
              if (isExerciseBreak) {
                setCurrentExercise(
                  dispatch,
                  getNextExercise({ routine, currentExercise }),
                );
                setCurrentRep(dispatch, 1);
                setShouldTimerReset(dispatch, true);
                setIsExerciseBreak(dispatch, false);
                playSound('change');
              }
            }
          }
        }
      }
    }
  }, [
    timeRemaining,
    routine.exercises.length,
    isPreroutineCountdown,
    isExerciseBreak,
    currentRep,
    currentExercise.numReps,
    isRepBreak,
    currentExercise,
    routine,
  ]);

  if (shouldTimerReset) {
    setShouldTimerReset(dispatch, false);
  }

  return {
    store,
    dispatch,
    timeRemaining,
  };
}
