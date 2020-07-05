import { Exercise } from '../../../core/typings';
import {
  SET_IS_PREROUTINE_COUNTDOWN,
  SET_CURRENT_EXERCISE,
  SET_IS_TIMER_RUNNING,
  SET_CURRENT_REP,
  SET_IS_ROUTINE_FINISHED,
  SET_SHOULD_TIMER_RESET,
  SET_IS_REP_BREAK,
  SET_IS_EXERCISE_BREAK,
} from './actions';

export function getInitialState(firstExercise: Exercise) {
  return {
    isPreroutineCountdown: true,
    currentExercise: firstExercise,
    isTimerRunning: false,
    currentRep: 1,
    isRoutineFinished: false,
    shouldTimerReset: false,
    isRepBreak: false,
    isExerciseBreak: false,
  };
}

export function reducer(state, { type, payload }) {
  switch (type) {
    case SET_IS_PREROUTINE_COUNTDOWN:
      return { ...state, isPreroutineCountdown: payload };
    case SET_CURRENT_EXERCISE:
      return { ...state, currentExercise: payload };
    case SET_IS_TIMER_RUNNING:
      return { ...state, isTimerRunning: payload };
    case SET_CURRENT_REP:
      return { ...state, currentRep: payload };
    case SET_IS_ROUTINE_FINISHED:
      return { ...state, isRoutineFinished: payload };
    case SET_SHOULD_TIMER_RESET:
      return { ...state, shouldTimerReset: payload };
    case SET_IS_REP_BREAK:
      return { ...state, isRepBreak: payload };
    case SET_IS_EXERCISE_BREAK:
      return { ...state, isExerciseBreak: payload };
    default:
      return state;
  }
}
