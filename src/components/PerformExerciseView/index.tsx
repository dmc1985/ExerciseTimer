import React, { ReactElement } from 'react';
import { Container, ScreenTitle, TimeDisplay } from './styledComponents';
import { Exercise } from '../../core/typings';

export interface Props {
  exercise: Exercise;
  currentRep: number;
  timeRemaining: number;
  isBreak: boolean;
  isExerciseBreak: boolean;
}

const PerformExerciseView = ({
  exercise,
  currentRep,
  timeRemaining,
  isBreak,
  isExerciseBreak,
}: Props): ReactElement => {
  return (
    <Container>
      <ScreenTitle>Exercise Name: {exercise.name}</ScreenTitle>
      <ScreenTitle>
        Current Rep: {currentRep}/{exercise.numReps}
      </ScreenTitle>
      <ScreenTitle>
        {isExerciseBreak ? 'Interval' : isBreak ? 'Break' : 'Rep'}
      </ScreenTitle>
      <TimeDisplay>{timeRemaining}</TimeDisplay>
    </Container>
  );
};

export default PerformExerciseView;
