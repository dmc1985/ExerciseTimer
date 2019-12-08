import React, { ReactElement } from 'react';
import { Text } from 'react-native';
import { Container } from './styledComponents';
import { Routine } from '../../core/typings';
import RoutineListItem from './RoutineListItem';

interface Props {
  routines: Routine[];
}

const RoutineList = ({ routines }: Props): ReactElement => (
  <Container>
    <Text>Routine List</Text>
    {routines.map(
      (routine: Routine): ReactElement => (
        <RoutineListItem name={routine.name} key={routine.name} />
      ),
    )}
  </Container>
);

export default RoutineList;
