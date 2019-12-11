import React, { ReactElement } from 'react';
import { Container, ScreenTitle } from './styledComponents';
import { NavigationScreenProp } from 'react-navigation';
import { Exercise } from '../../core/typings';
import ExerciseDetail from './ExerciseDetail';

interface Props {
  navigation: NavigationScreenProp<{}>;
}

const RoutineDetail = ({ navigation }: Props): ReactElement => {
  const routine = navigation.getParam('routine');
  return (
    <Container>
      <ScreenTitle>{routine.name}</ScreenTitle>
      {routine.exercises.map(
        (exercise: Exercise): ReactElement => (
          <ExerciseDetail exercise={exercise} key={exercise.name} showName />
        ),
      )}
    </Container>
  );
};

export default RoutineDetail;
