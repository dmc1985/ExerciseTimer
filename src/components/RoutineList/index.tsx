import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import { Nullable } from '../../common/typings';
import { Routine } from '../../core/typings';
import { NavigationScreenProp } from 'react-navigation';
import Screen from '../../core/Screen';
import { Button, Colors, List } from 'react-native-paper';

interface Props {
  routines: Routine[];
  navigation: NavigationScreenProp<{}>;
  setRoutineToDelete: Dispatch<SetStateAction<Nullable<Routine>>>;
  preroutineCountdownLength: number;
}

const RoutineList = ({
  routines,
  navigation,
  setRoutineToDelete,
  preroutineCountdownLength,
}: Props): ReactElement => (
  <List.Section>
    {routines.map(
      (routine: Routine): ReactElement => (
        <List.Item
          title={routine.name}
          key={routine.name}
          onPress={() => {
            navigation.navigate(Screen.RoutineDetail, {
              routine,
              preroutineCountdownLength,
            });
          }}
          left={() => <List.Icon color={Colors.blue500} icon="run-fast" />}
          right={() => (
            <Button
              style={{ justifyContent: 'center' }}
              color="red"
              onPress={() => {
                setRoutineToDelete(routine);
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

export default RoutineList;
