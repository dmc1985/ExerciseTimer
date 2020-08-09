import React, { ReactElement, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Nullable } from '../../common/typings';
import {
  getPreroutineCountdownLength,
  setPreroutineCountdownLength,
} from '../../core/helper';

const SettingsScreen = (): ReactElement => {
  const [preroutineCountdownLength, modifyPreroutineCountdownLength] = useState<
    Nullable<string>
  >();
  useEffect(() => {
    async function getCountdownLength() {
      const countdownLength = await getPreroutineCountdownLength();
      modifyPreroutineCountdownLength(countdownLength);
    }

    getCountdownLength();
  }, []);

  return (
    <View>
      <Text>Preroutine Countdown Length</Text>
      <TextInput
        label="Preroutine Countdown (seconds)"
        onChangeText={(input: string): void => {
          modifyPreroutineCountdownLength(input);
        }}
        value={preroutineCountdownLength || undefined}
        keyboardType="number-pad"
      />
      <Button
        disabled={!preroutineCountdownLength}
        onPress={() => setPreroutineCountdownLength(preroutineCountdownLength!)}
      >
        Set Countdown Length
      </Button>
    </View>
  );
};

export default SettingsScreen;
