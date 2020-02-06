import React, { ReactElement } from 'react';
import { Text } from 'react-native';
import { Container } from './styledComponents';
import { Routine } from '../../core/typings';
import RoutineListItem from './RoutineListItem';
import { NavigationScreenProp } from 'react-navigation';
import Screen from '../../core/Screen';

interface Props {
  routines: Routine[];
  navigation: NavigationScreenProp<{}>;
}

const RoutineList = ({ routines, navigation }: Props): ReactElement => {
  return (
    <Container>
      <Text>Routine List</Text>
      {routines.map(
        (routine: Routine): ReactElement => (
          <RoutineListItem
            name={routine.name}
            key={routine.name}
            onPress={() =>
              navigation.navigate(Screen.RoutineDetail, { routine })
            }
          />
        ),
      )}
    </Container>
  );
};

export default RoutineList;
