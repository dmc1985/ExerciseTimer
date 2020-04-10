import React, { ReactElement, useEffect, useState } from 'react';
import { Text } from 'react-native';
import FloatingActionButton from '../../common/components/FloatingActionButton';
import { getAllRoutineNames, getRoutines } from '../../core/helper';
import RoutineList from '../../components/RoutineList';
import { Container } from './styledComponents';
import { Routine } from '../../core/typings';
import { NavigationScreenProp } from 'react-navigation';
import Screen from '../../core/Screen';
import { Nullable } from '../../common/typings';

export interface Props {
  navigation: NavigationScreenProp<{}>;
}

const HomeScreen = ({ navigation }: Props): ReactElement => {
  const [allRoutines, setAllRoutines] = useState<Routine[]>([]);
  const [shouldReloadList, toggleShouldReloadList] = useState<boolean>(false);

  useEffect(() => {
    async function getAllRoutines() {
      const routineNames: Nullable<string[]> = await getAllRoutineNames();
      if (!routineNames) {
        return setAllRoutines([]);
      }

      const allRoutines: Nullable<Routine[]> = await getRoutines(routineNames);
      if (!allRoutines) {
        return setAllRoutines([]);
      }
      setAllRoutines(allRoutines);
    }

    toggleShouldReloadList(false);
    getAllRoutines();
  }, [shouldReloadList]);

  return (
    <>
      <Container>
        <RoutineList
          navigation={navigation}
          routines={allRoutines}
          toggleShouldReloadList={toggleShouldReloadList}
        />
      </Container>
      <FloatingActionButton
        small
        icon="plus"
        onPress={() =>
          navigation.navigate(Screen.NewRoutineForm, { toggleShouldReloadList })
        }
      />
    </>
  );
};

export function navigationOptions() {
  return {
    headerTitle: <Text>Exercise Timer</Text>,
  };
}

HomeScreen.navigationOptions = navigationOptions;

export default HomeScreen;
