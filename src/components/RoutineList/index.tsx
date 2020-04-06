import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import { deleteRoutine } from '../../core/helper';
import { Routine } from '../../core/typings';
import { NavigationScreenProp } from 'react-navigation';
import Screen from '../../core/Screen';
import { Button, Colors, List } from 'react-native-paper';

interface Props {
  routines: Routine[];
  navigation: NavigationScreenProp<{}>;
  toggleShouldReloadList: Dispatch<SetStateAction<boolean>>;
}

const RoutineList = ({
  routines,
  navigation,
  toggleShouldReloadList,
}: Props): ReactElement => {
  return (
    <List.Section>
      <List.Subheader>My Routines</List.Subheader>
      {routines.map(
        (routine: Routine): ReactElement => (
          <List.Item
            title={routine.name}
            key={routine.name}
            onPress={() => {
              navigation.navigate(Screen.RoutineDetail, { routine });
            }}
            left={() => <List.Icon color={Colors.blue500} icon="run-fast" />}
            right={() => (
              <Button
                onPress={() => {
                  deleteRoutine(routine.name);
                  toggleShouldReloadList(true);
                }}
              >
                Delete
              </Button>
            )}
          />
        ),
      )}
    </List.Section>
  );
};

export default RoutineList;
