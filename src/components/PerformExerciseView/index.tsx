import React, { ReactElement } from 'react';
import CircularProgress from './CircularProgress';
import {
  Container,
  CurrentRep,
  CurrentRepContainer,
  ExerciseName,
  ExerciseNameContainer,
  InfoTitle,
  ScreenTitle,
  TimeDisplay,
  TimeDisplayContainer,
  TotalReps,
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
  isRoutineFinished: boolean;
}

const PerformExerciseView = ({
  exercise,
  currentRep,
  timeRemaining,
  timerDuration,
  isBreak,
  isExerciseBreak,
  isPreroutineCountdown,
  isRoutineFinished,
}: Props): ReactElement => {
  return (
    <Container>
      <ExerciseNameContainer>
        <InfoTitle>Exercise Name: </InfoTitle>
        <ExerciseName>{exercise.name}</ExerciseName>
      </ExerciseNameContainer>
      <CurrentRepContainer>
        <InfoTitle>Current Rep:</InfoTitle>
        <CurrentRep> {currentRep}</CurrentRep>
        <TotalReps>/{exercise.numReps}</TotalReps>
      </CurrentRepContainer>
      <CircularProgress
        progress={!timerDuration ? 0 : 1 - timeRemaining / timerDuration}
      >
        <TimeDisplayContainer>
          <TimeDisplay>{timeRemaining}s</TimeDisplay>
        </TimeDisplayContainer>
      </CircularProgress>
      <ScreenTitle>
        {isRoutineFinished
          ? 'Finished!'
          : isPreroutineCountdown
          ? 'Get ready...'
          : isExerciseBreak
          ? 'Interval'
          : isBreak
          ? 'Break'
          : 'Rep'}
      </ScreenTitle>
    </Container>
  );
};

export default PerformExerciseView;
