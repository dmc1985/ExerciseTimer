export const SET_IS_PREROUTINE_COUNTDOWN = 'SET_IS_PREROUTINE_COUNTDOWN';
export const SET_CURRENT_EXERCISE = 'SET_CURRENT_EXERCISE';
export const SET_IS_TIMER_RUNNING = 'SET_IS_TIMER_RUNNING';
export const SET_CURRENT_REP = 'SET_CURRENT_REP';
export const SET_IS_ROUTINE_FINISHED = 'SET_IS_ROUTINE_FINISHED';
export const SET_SHOULD_TIMER_RESET = 'SET_SHOULD_TIMER_RESET';
export const SET_IS_REP_BREAK = 'SET_IS_REP_BREAK';
export const SET_IS_EXERCISE_BREAK = 'SET_IS_EXERCISE_BREAK';

export const setIsPreroutineCountdown = (dispatch, payload) => {
  dispatch({ type: SET_IS_PREROUTINE_COUNTDOWN, payload });
};

export const setCurrentExercise = (dispatch, payload) => {
  dispatch({ type: SET_CURRENT_EXERCISE, payload });
};

export const setIsTimerRunning = (dispatch, payload) => {
  dispatch({ type: SET_IS_TIMER_RUNNING, payload });
};

export const setCurrentRep = (dispatch, payload) => {
  dispatch({ type: SET_CURRENT_REP, payload });
};

export const setIsRoutineFinished = (dispatch, payload) => {
  dispatch({ type: SET_IS_ROUTINE_FINISHED, payload });
};

export const setShouldTimerReset = (dispatch, payload) => {
  dispatch({ type: SET_SHOULD_TIMER_RESET, payload });
};

export const setIsRepBreak = (dispatch, payload) => {
  dispatch({ type: SET_IS_REP_BREAK, payload });
};

export const setIsExerciseBreak = (dispatch, payload) => {
  dispatch({ type: SET_IS_EXERCISE_BREAK, payload });
};
