import React, { ReactElement } from 'react';
import { Container, ScreenTitle } from './styledComponents';
import { NavigationScreenProp } from 'react-navigation';
import { Exercise } from '../../core/typings';
import ExerciseDetail from './ExerciseDetail';
import { Button } from 'react-native';
import Screen from '../../core/Screen';

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
      <Button
        title={'Perform Routine'}
        onPress={() =>
          navigation.navigate(Screen.PerformRoutineScreen, { routine })
        }
      />
    </Container>
  );
};

export default RoutineDetail;
