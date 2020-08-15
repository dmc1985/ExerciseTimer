import {
  Dispatch,
  ReducerAction,
  ReducerState,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
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

export function useInterval(
  callback: () => any,
  delay: Nullable<number>,
): void {
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

interface ExerciseTimerData {
  state: ReducerState<ExerciseReducer>;
  dispatch: Dispatch<ReducerAction<ExerciseReducer>>;
  timeRemaining: number;
  timerDuration: number;
}

interface HandleExerciseTimerParams
  extends Pick<ExerciseTimerData, 'state' | 'dispatch' | 'timeRemaining'> {
  routine: Routine;
}

export function useExpiredTimer({
  state,
  dispatch,
  routine,
  timeRemaining,
}: HandleExerciseTimerParams): void {
  useEffect(() => {
    const {
      isPreroutineCountdown,
      currentExercise,
      currentRep,
      isRepBreak,
      isExerciseBreak,
      isRoutineFinished,
    } = state;

    if (timeRemaining > 0 || isRoutineFinished) {
      return;
    }

    if (isPreroutineCountdown) {
      setIsPreroutineCountdown(dispatch, false);
      setShouldTimerReset(dispatch, true);

      playSound(soundMap.begin);
      return;
    }

    if (
      getCurrentExerciseIndex({ routine, currentExercise }) ===
        routine.exercises.length - 1 &&
      currentRep === +currentExercise.numReps &&
      isRepBreak
    ) {
      setIsTimerRunning(dispatch, false);
      setIsRoutineFinished(dispatch, true);

      playSound(soundMap.finished);
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
      setIsRepBreak(dispatch, false);

      playSound(soundMap.change);
      return;
    }

    if (isRepBreak && currentRep < currentExercise.numReps) {
      setIsRepBreak(dispatch, false);
      setCurrentRep(dispatch, currentRep + 1);
      setShouldTimerReset(dispatch, true);

      if (currentExercise.repLengthSeconds) {
        playSound(soundMap.next);
      }
      return;
    }

    if (!isRepBreak && currentRep <= currentExercise.numReps) {
      setIsRepBreak(dispatch, true);
      setShouldTimerReset(dispatch, true);

      if (currentExercise.breakLengthSeconds) {
        playSound(soundMap.take_break);
      }
      return;
    }

    if (isRepBreak && currentRep === currentExercise.numReps) {
      setIsExerciseBreak(dispatch, true);
      setShouldTimerReset(dispatch, true);

      playSound(soundMap.interval);
      return;
    }
  }, [timeRemaining, routine, state, dispatch]);
}

export function useExerciseTimer(
  routine: Routine,
  preroutineCountdownLength: number,
): ExerciseTimerData {
  const initialState: State = getInitialState(routine.exercises[0]);

  const [state, dispatch] = useReducer<ExerciseReducer>(reducer, initialState);
  const {
    isPreroutineCountdown,
    currentExercise,
    isTimerRunning,
    shouldTimerReset,
    isRepBreak,
    isExerciseBreak,
  } = state;

  const timerDuration = getTimerDuration({
    isPreroutineCountdown,
    preroutineCountdownLength,
    isRepBreak,
    isExerciseBreak,
    currentExercise,
  });

  const timeRemaining = useTimer(
    timerDuration,
    isTimerRunning,
    shouldTimerReset,
  );

  useExpiredTimer({ state, dispatch, routine, timeRemaining });

  if (shouldTimerReset) {
    setShouldTimerReset(dispatch, false);
  }

  return {
    state,
    dispatch,
    timeRemaining,
    timerDuration,
  };
}
