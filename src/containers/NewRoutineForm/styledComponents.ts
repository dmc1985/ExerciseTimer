import { View, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { Button, TextInput } from 'react-native-paper';
import styled from 'styled-components';
import { em } from '../../common/helper';

const BOTTOM_BUTTON_POSITION = 16;

export const Container = styled(View)`
  width: 100%;
  margin: ${em(2)} 0 ${em((BOTTOM_BUTTON_POSITION * 2) / 16)};
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

export const ButtonContainer = styled(View)`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const StyledButton = styled(Button)`
  width: 50%;
`;

export const ExerciseFieldsContainer = styled(KeyboardAwareScrollView)`
  width: 100%;
  height: 100%;
`;

export const BottomButtonContainer = styled(View)`
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  bottom: ${BOTTOM_BUTTON_POSITION};
`;
