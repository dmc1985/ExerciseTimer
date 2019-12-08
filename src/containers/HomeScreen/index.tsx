import React, { ReactElement, useEffect, useState } from 'react';
import { getAllRoutineNames, getRoutines } from '../../core/helper';
import RoutineList from '../../components/RoutineList';
import { StyledButton, Container } from './styledComponents';
import { Routine } from '../../core/typings';
import { NavigationScreenProp } from 'react-navigation';
import Screen from '../../core/Screen';
import { Text } from 'react-native';

export interface Props {
  navigation: NavigationScreenProp<{}>;
}

const HomeScreen = ({ navigation }: Props): ReactElement => {
  const [allRoutines, setAllRoutines] = useState<Routine[]>([]);
  useEffect(() => {
    async function getAllRoutines() {
      const routineNames = await getAllRoutineNames();
      const allRoutines = await getRoutines(routineNames);
      setAllRoutines(allRoutines);
    }

    getAllRoutines();
  }, []);

  return (
    <Container>
      <RoutineList navigation={navigation} routines={allRoutines} />
      <StyledButton
        title="Add New Routine"
        onPress={() => navigation.navigate(Screen.NewRoutineForm)}
      >
        <Text>AAA</Text>
      </StyledButton>
    </Container>
  );
};

export default HomeScreen;