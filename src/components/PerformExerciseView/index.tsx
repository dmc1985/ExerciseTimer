import React, { ReactElement } from 'react';
import CircularProgress from './CircularProgress';
import {
  Container,
  CurrentRep,
  ExerciseName,
  ScreenTitle,
} from './styledComponents';
import { Exercise } from '../../core/typings';

export interface Props {
  isTimerRunning: boolean;
  exercise: Exercise;
  currentRep: number;
  timeRemaining: number;
  timerDuration: number;
  isBreak: boolean;
  isExerciseBreak: boolean;
  isPreroutineCountdown: boolean;
}

const PerformExerciseView = ({
  exercise,
  currentRep,
  timeRemaining,
  timerDuration,
  isBreak,
  isExerciseBreak,
  isPreroutineCountdown,
}: Props): ReactElement => {
  return (
    <Container>
      <ExerciseName>Exercise Name: {exercise.name}</ExerciseName>
      <CurrentRep>
        Current Rep: {currentRep}/{exercise.numReps}
      </CurrentRep>
      <ScreenTitle>
        {isPreroutineCountdown
          ? 'Get ready to start...'
          : isExerciseBreak
          ? 'Interval'
          : isBreak
          ? 'Break'
          : 'Rep'}
      </ScreenTitle>
      <CircularProgress
        timeRemaining={timeRemaining}
        timerDuration={timerDuration}
      />
    </Container>
  );
};

export default PerformExerciseView;
