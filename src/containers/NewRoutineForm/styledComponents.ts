import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import styled from 'styled-components';
import { em } from '../../common/helper';

export const Container = styled(ScrollView)`
  width: 100%;
  height: 100%;
`;

export const StyledTextInput = styled(TextInput)`
  width: 80%
  height: ${em(2)};
  border: 1px solid blue;
`;

export const InputLabel = styled(Text)`
  font-size: ${em(1.5)};
`;

export const StyledButton = styled(Button)`
  height: ${em(2)}
  width: ${em(2)}
  background-color: green;
`;

export const ExerciseFieldsContainer = styled(View)``;
