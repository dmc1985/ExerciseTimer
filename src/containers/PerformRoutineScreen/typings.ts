import { Dispatch, Reducer, ReducerAction } from 'react';
import { Exercise } from '../../core/typings';

export interface State {
  isPreroutineCountdown: boolean;
  currentExercise: Exercise;
  isTimerRunning: boolean;
  currentRep: number;
  isRoutineFinished: boolean;
  shouldTimerReset: boolean;
  isRepBreak: boolean;
  isExerciseBreak: boolean;
}

export enum ActionType {
  SET_IS_PREROUTINE_COUNTDOWN = 'SET_IS_PREROUTINE_COUNTDOWN',
  SET_CURRENT_EXERCISE = 'SET_CURRENT_EXERCISE',
  SET_IS_TIMER_RUNNING = 'SET_IS_TIMER_RUNNING',
  SET_CURRENT_REP = 'SET_CURRENT_REP',
  SET_IS_ROUTINE_FINISHED = 'SET_IS_ROUTINE_FINISHED',
  SET_SHOULD_TIMER_RESET = 'SET_SHOULD_TIMER_RESET',
  SET_IS_REP_BREAK = 'SET_IS_REP_BREAK',
  SET_IS_EXERCISE_BREAK = 'SET_IS_EXERCISE_BREAK',
}

export type Action = {
  type: ActionType;
  payload: boolean | Exercise | number;
};

export interface ExerciseReducer extends Reducer<State, Action> {}

export interface ExerciseDispatch
  extends Dispatch<ReducerAction<ExerciseReducer>> {}
