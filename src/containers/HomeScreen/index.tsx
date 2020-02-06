import React, { ReactElement, useEffect, useState } from 'react';
import { getAllRoutineNames, getRoutines } from '../../core/helper';
import RoutineList from '../../components/RoutineList';
import { StyledButton, Container } from './styledComponents';
import { Routine } from '../../core/typings';
import { NavigationScreenProp } from 'react-navigation';
import Screen from '../../core/Screen';

export interface Props {
  navigation: NavigationScreenProp<{}>;
}

const HomeScreen = ({ navigation }: Props): ReactElement => {
  const [allRoutines, setAllRoutines] = useState<Routine[]>([]);
  const [shouldReloadList, toggleShouldReloadList] = useState<boolean>(false);

  useEffect(() => {
    async function getAllRoutines() {
      const routineNames = await getAllRoutineNames();

      const allRoutines = await getRoutines(routineNames);
      setAllRoutines(allRoutines);
    }

    toggleShouldReloadList(false);
    // toggleIsRoutineAdded(false);
    getAllRoutines();
  }, [shouldReloadList]);

  return (
    <Container>
      <RoutineList
        navigation={navigation}
        routines={allRoutines}
        toggleShouldReloadList={toggleShouldReloadList}
      />
      <StyledButton
        title="Add New Routine"
        onPress={() =>
          navigation.navigate(Screen.NewRoutineForm, { toggleShouldReloadList })
        }
      />
    </Container>
  );
};

export default HomeScreen;
