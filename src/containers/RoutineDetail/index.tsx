import React, { ReactElement } from 'react';
import { Text } from 'react-native';
import FloatingActionButton from '../../common/components/FloatingActionButton';
import { Container } from './styledComponents';
import { NavigationScreenProp } from 'react-navigation';
import { Exercise, Routine } from '../../core/typings';
import ExerciseDetail from './ExerciseDetail';
import Screen from '../../core/Screen';

interface Props {
  navigation: NavigationScreenProp<{}>;
}

const RoutineDetail = ({ navigation }: Props): ReactElement => {
  const routine = navigation.getParam('routine');
  return (
    <>
      <Container>
        {routine.exercises.map(
          (exercise: Exercise): ReactElement => (
            <ExerciseDetail exercise={exercise} key={exercise.name} />
          ),
        )}
      </Container>
      <FloatingActionButton
        small
        icon="play"
        onPress={() =>
          navigation.navigate(Screen.PerformRoutineScreen, { routine })
        }
      />
    </>
  );
};

export function navigationOptions({ navigation }) {
  const routine: Routine = navigation.getParam('routine');
  return {
    headerTitle: <Text>{routine.name}</Text>,
  };
}

RoutineDetail.navigationOptions = navigationOptions;

export default RoutineDetail;
