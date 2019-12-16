import React, { ReactElement } from 'react';
import { Container, ScreenTitle, TimeDisplay } from './styledComponents';
import { Exercise } from '../../core/typings';

export interface Props {
  exercise: Exercise;
  currentRep: number;
  timeRemaining: number;
  isRepBreak: boolean;
}

const PerformExerciseView = ({
  exercise,
  currentRep,
  timeRemaining,
  isRepBreak,
}: Props): ReactElement => {
  return (
    <Container>
      <ScreenTitle>Exercise Name: {exercise.name}</ScreenTitle>
      <ScreenTitle>
        Current Rep: {currentRep}/{exercise.numReps}
      </ScreenTitle>
      <ScreenTitle>{isRepBreak ? 'Break' : 'Rep'}</ScreenTitle>
      <TimeDisplay>{timeRemaining}</TimeDisplay>
    </Container>
  );
};

export default PerformExerciseView;
