import React, { ReactElement } from 'react';
import CircularProgress from './CircularProgress';
import {
  Container,
  CurrentRep,
  RepInfoContainer,
  ExerciseName,
  ExerciseNameContainer,
  InfoTitle,
  RepContext,
  TimeDisplay,
  TimeDisplayContainer,
  TotalReps,
  RepNumberContainer,
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
      <RepInfoContainer>
        <RepNumberContainer>
          <InfoTitle>Rep:</InfoTitle>
          <CurrentRep> {currentRep}</CurrentRep>
          <TotalReps>/{exercise.numReps}</TotalReps>
        </RepNumberContainer>
        <RepContext>
          {isRoutineFinished
            ? 'Finished!'
            : isPreroutineCountdown
            ? 'Get ready...'
            : isExerciseBreak
            ? 'Interval'
            : isBreak
            ? 'Break'
            : 'Rep'}
        </RepContext>
      </RepInfoContainer>
      <CircularProgress
        progress={!timerDuration ? 0 : 1 - timeRemaining / timerDuration}
      >
        <TimeDisplayContainer>
          <TimeDisplay>{timeRemaining}s</TimeDisplay>
        </TimeDisplayContainer>
      </CircularProgress>
    </Container>
  );
};

export default PerformExerciseView;
