import React, { ReactElement } from 'react';
import { Text } from 'react-native';
import { Container } from './styledComponents';

interface Props {
  name: string;
}

const RoutineListItem = ({ name }: Props): ReactElement => (
  <Container>
    <Text>{name}</Text>
  </Container>
);

export default RoutineListItem;
