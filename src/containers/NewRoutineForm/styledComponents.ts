import { View, ScrollView, Button, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import styled from 'styled-components';
import { em } from '../../common/helper';

export const Container = styled(ScrollView)`
  width: 100%;
  height: 100%;
  margin-top: ${em(2)};
`;

export const StyledTextInput = styled(TextInput)`
  margin-bottom: ${em(3)};
`;

export const InputLabel = styled(Text)`
  font-size: ${em(1.5)};
`;

export const ErrorText = styled(Text)`
  font-size: ${em(1)};
  color: red;
`;

export const StyledButton = styled(Button)`
  height: ${em(2)}
  width: ${em(2)}
  background-color: green;
  margin-bottom: ${em(3)};
`;

export const ExerciseFieldsContainer = styled(View)``;
