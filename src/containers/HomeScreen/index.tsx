import React, { ReactElement, useEffect, useState } from 'react';
import { Text } from 'react-native';
import { IconButton } from 'react-native-paper';
import FloatingActionButton from '../../common/components/FloatingActionButton';
import {
  deleteRoutine,
  getAllRoutineNames,
  getPreroutineCountdownLength,
  getRoutines,
  setPreroutineCountdownLength,
} from '../../core/helper';
import RoutineList from '../../components/RoutineList';
import DeleteRoutineModal from './DeleteRoutineModal';
import { Container } from './styledComponents';
import { Routine } from '../../core/typings';
import { NavigationScreenProp } from 'react-navigation';
import Screen from '../../core/Screen';
import { Nullable } from '../../common/typings';

export interface Props {
  navigation: NavigationScreenProp<{}>;
}

const DEFAULT_PREROUTINE_COUNTDOWN_LENGTH = 5;

const HomeScreen = ({ navigation }: Props): ReactElement => {
  const [allRoutines, setAllRoutines] = useState<Routine[]>([]);
  const [shouldReloadList, toggleShouldReloadList] = useState<boolean>(false);
  const [routineToDelete, setRoutineToDelete] = useState<Nullable<Routine>>(
    null,
  );

  const dismissModal = () => setRoutineToDelete(null);

  useEffect(() => {
    async function definePreroutineCountdownLength() {
      const preroutineCountdownLength = await getPreroutineCountdownLength();
      if (!preroutineCountdownLength) {
        await setPreroutineCountdownLength(
          DEFAULT_PREROUTINE_COUNTDOWN_LENGTH.toString(),
        );
      }
    }

    definePreroutineCountdownLength();
  }, []);

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
      <DeleteRoutineModal
        routine={routineToDelete}
        dismissModal={dismissModal}
        deleteRoutine={async () => {
          await deleteRoutine(routineToDelete!.name);
          toggleShouldReloadList(true);
        }}
      />
      <Container>
        <RoutineList
          navigation={navigation}
          routines={allRoutines}
          setRoutineToDelete={setRoutineToDelete}
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

export function navigationOptions({ navigation }) {
  return {
    headerTitle: <Text>Exercise Timer</Text>,
    headerRight: (
      <IconButton
        icon="settings"
        animated
        onPress={() => navigation.navigate(Screen.SettingsScreen)}
      />
    ),
  };
}

HomeScreen.navigationOptions = navigationOptions;

export default HomeScreen;
