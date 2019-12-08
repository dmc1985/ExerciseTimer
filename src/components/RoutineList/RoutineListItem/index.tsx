import React, { ReactElement } from 'react';
import { Text, TouchableOpacityProps } from 'react-native';
import { Container } from './styledComponents';

interface Props extends TouchableOpacityProps {
  name: string;
}

const RoutineListItem = ({ name, onPress }: Props): ReactElement => (
  <Container onPress={onPress}>
    <Text>{name}</Text>
  </Container>
);

export default RoutineListItem;
