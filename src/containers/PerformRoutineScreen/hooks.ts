import { useEffect, useReducer, useRef, useState } from 'react';
import { Nullable } from '../../common/typings';
import { Routine } from '../../core/typings';
import {
  getCurrentExerciseIndex,
  getNextExercise,
  getTimerDuration,
  playSound,
  soundMap,
} from './helper';
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
import { ExerciseReducer, State } from './typings';

export function useInterval(callback: () => any, delay: Nullable<number>) {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current!();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export function useTimer(
  timerDuration: number,
  shouldTimerRun: boolean,
  shouldTimerReset: boolean,
) {
  const [remainingTime, setRemainingTime] = useState<number>(timerDuration);
  if (shouldTimerReset) {
    setRemainingTime(timerDuration);
  }

  useInterval(
    () => setRemainingTime(+(remainingTime - 1).toFixed(1)),
    remainingTime >= 0 && shouldTimerRun ? 1000 : null,
  );

  return remainingTime;
}

export function useExerciseTimer(routine: Routine) {
  const initialState: State = getInitialState(routine.exercises[0]);

  const [state, dispatch] = useReducer<ExerciseReducer>(reducer, initialState);

  const {
    isPreroutineCountdown,
    currentExercise,
    isTimerRunning,
    currentRep,
    shouldTimerReset,
    isRepBreak,
    isExerciseBreak,
  } = state;

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
    if (timeRemaining > 0) {
      return;
    }

    if (isPreroutineCountdown) {
      setIsPreroutineCountdown(dispatch, false);
      setShouldTimerReset(dispatch, true);

      playSound(soundMap.begin);
      return;
    }

    if (isExerciseBreak) {
      setCurrentExercise(
        dispatch,
        getNextExercise({ routine, currentExercise }),
      );
      setCurrentRep(dispatch, 1);
      setShouldTimerReset(dispatch, true);
      setIsExerciseBreak(dispatch, false);

      playSound(soundMap.change);
      return;
    }

    if (isRepBreak && currentRep < currentExercise.numReps) {
      setIsRepBreak(dispatch, false);
      setCurrentRep(dispatch, currentRep + 1);
      setShouldTimerReset(dispatch, true);

      playSound(soundMap.next);
      return;
    }

    if (!isRepBreak && currentRep < currentExercise.numReps) {
      setIsRepBreak(dispatch, true);
      setShouldTimerReset(dispatch, true);

      playSound(soundMap.break);
      return;
    }

    if (!isRepBreak && currentRep === currentExercise.numReps) {
      playSound(soundMap.interval);
      setIsExerciseBreak(dispatch, true);
      setShouldTimerReset(dispatch, true);
      return;
    }

    if (
      getCurrentExerciseIndex({ routine, currentExercise }) ===
        routine.exercises.length - 1 &&
      currentRep === +currentExercise.numReps
    ) {
      setIsTimerRunning(dispatch, false);
      setIsRoutineFinished(dispatch, true);

      playSound(soundMap.finished);
      return;
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
    store: state,
    dispatch,
    timeRemaining,
  };
}
