import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import { Button, Text, TouchableOpacityProps } from 'react-native';
import { Container } from './styledComponents';
import { deleteRoutine } from '../../../core/helper';

interface Props extends TouchableOpacityProps {
  name: string;
  toggleShouldReloadList: Dispatch<SetStateAction<boolean>>;
}

const RoutineListItem = ({
  name,
  onPress,
  toggleShouldReloadList,
}: Props): ReactElement => (
  <Container onPress={onPress}>
    <Text>{name}</Text>
    <Button
      onPress={() => {
        deleteRoutine(name);
        toggleShouldReloadList(true);
      }}
      title="Delete"
    />
  </Container>
);

export default RoutineListItem;
