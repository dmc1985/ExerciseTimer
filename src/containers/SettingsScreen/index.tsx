import React, { ReactElement, useState } from 'react';
import { Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { setPreroutineCountdownLength } from '../../core/helper';
import { NavigationScreenProp } from 'react-navigation';
import Screen from '../../core/Screen';
import { ButtonContainer, Container } from './styledComponents';

interface Props {
  navigation: NavigationScreenProp<{}>;
}

const SettingsScreen = ({ navigation }: Props): ReactElement => {
  const countdownLength = navigation.getParam('countdownLength');
  const setCountdownLength = navigation.getParam('setCountdownLength');

  const [inputLength, setInputLength] = useState(countdownLength.toString());

  return (
    <Container>
      <TextInput
        label="Preroutine Countdown (seconds)"
        onChangeText={setInputLength}
        value={inputLength}
        keyboardType="number-pad"
      />
      <ButtonContainer>
        <Button
          disabled={!inputLength}
          onPress={() => {
            setCountdownLength(+inputLength);
            navigation.navigate(Screen.HomeScreen);
            return setPreroutineCountdownLength(inputLength!);
          }}
        >
          Set Countdown Length
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export function navigationOptions() {
  return {
    headerTitle: <Text>Settings</Text>,
  };
}

SettingsScreen.navigationOptions = navigationOptions;

export default SettingsScreen;
