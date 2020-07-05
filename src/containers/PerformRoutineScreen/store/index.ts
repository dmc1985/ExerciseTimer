import { Exercise } from '../../../core/typings';
import { Action, ActionType, State } from '../typings';

export function getInitialState(firstExercise: Exercise): State {
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

export function reducer(state: State, { type, payload }: Action): State {
  switch (type) {
    case ActionType.SET_IS_PREROUTINE_COUNTDOWN:
      return { ...state, isPreroutineCountdown: payload as boolean };
    case ActionType.SET_CURRENT_EXERCISE:
      return { ...state, currentExercise: payload as Exercise };
    case ActionType.SET_IS_TIMER_RUNNING:
      return { ...state, isTimerRunning: payload as boolean };
    case ActionType.SET_CURRENT_REP:
      return { ...state, currentRep: payload as number };
    case ActionType.SET_IS_ROUTINE_FINISHED:
      return { ...state, isRoutineFinished: payload as boolean };
    case ActionType.SET_SHOULD_TIMER_RESET:
      return { ...state, shouldTimerReset: payload as boolean };
    case ActionType.SET_IS_REP_BREAK:
      return { ...state, isRepBreak: payload as boolean };
    case ActionType.SET_IS_EXERCISE_BREAK:
      return { ...state, isExerciseBreak: payload as boolean };
    default:
      return state;
  }
}
