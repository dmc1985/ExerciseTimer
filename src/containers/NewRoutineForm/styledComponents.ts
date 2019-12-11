import { View, TextInput, Button } from 'react-native';
import styled from 'styled-components';
import { em } from '../../common/helper';

export const Container = styled(View)`
  height: 100%;
  width: 100%;
  background-color: gray;
`;

export const StyledTextInput = styled(TextInput)`
  width: 200;
  border: 1px solid blue;
`;

export const StyledButton = styled(Button)`
  height: ${em(2)}
  width: ${em(2)}
  background-color: green;
`;

export const ExerciseFieldsContainer = styled(View)`
  height: 30%;
`;
