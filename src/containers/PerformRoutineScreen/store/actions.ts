import { Exercise } from '../../../core/typings';
import { ActionType, ExerciseDispatch } from '../typings';

export const setIsPreroutineCountdown = (
  dispatch: ExerciseDispatch,
  payload: boolean,
) => {
  dispatch({ type: ActionType.SET_IS_PREROUTINE_COUNTDOWN, payload });
};

export const setCurrentExercise = (
  dispatch: ExerciseDispatch,
  payload: Exercise,
) => {
  dispatch({ type: ActionType.SET_CURRENT_EXERCISE, payload });
};

export const setIsTimerRunning = (
  dispatch: ExerciseDispatch,
  payload: boolean,
) => {
  dispatch({ type: ActionType.SET_IS_TIMER_RUNNING, payload });
};

export const setCurrentRep = (dispatch: ExerciseDispatch, payload: number) => {
  dispatch({ type: ActionType.SET_CURRENT_REP, payload });
};

export const setIsRoutineFinished = (
  dispatch: ExerciseDispatch,
  payload: boolean,
) => {
  dispatch({ type: ActionType.SET_IS_ROUTINE_FINISHED, payload });
};

export const setShouldTimerReset = (
  dispatch: ExerciseDispatch,
  payload: boolean,
) => {
  dispatch({ type: ActionType.SET_SHOULD_TIMER_RESET, payload });
};

export const setIsRepBreak = (dispatch: ExerciseDispatch, payload: boolean) => {
  dispatch({ type: ActionType.SET_IS_REP_BREAK, payload });
};

export const setIsExerciseBreak = (
  dispatch: ExerciseDispatch,
  payload: boolean,
) => {
  dispatch({ type: ActionType.SET_IS_EXERCISE_BREAK, payload });
};
