import React, { ReactElement } from 'react';
import { Button, Colors, IconButton } from 'react-native-paper';
import { Exercise } from '../../core/typings';
import {
  ControlPanelContainer,
  ResetButtonContainer,
} from './styledComponents';

type SetStateAction<T> = (input: T) => void;

interface Props {
  toggleReset: SetStateAction<boolean>;
  isTimerRunning: boolean;
  toggleTimer: SetStateAction<boolean>;
  shouldShowMoreControls: boolean;
  setShowMoreControls: SetStateAction<boolean>;
  setCurrentExercise: SetStateAction<Exercise>;
  getPreviousExercise: () => Exercise;
  getNextExercise: () => Exercise;
  resetExercise: () => void;
  resetRoutine: () => void;
}

const ControlPanel = ({
  toggleReset,
  isTimerRunning,
  toggleTimer,
  shouldShowMoreControls,
  setShowMoreControls,
  setCurrentExercise,
  getPreviousExercise,
  getNextExercise,
  resetExercise,
  resetRoutine,
}: Props): ReactElement => (
  <ControlPanelContainer>
    {shouldShowMoreControls && (
      <IconButton
        icon="skip-previous"
        color={Colors.green500}
        size={24}
        onPress={() => {
          setCurrentExercise(getPreviousExercise());
          toggleReset(true);
        }}
      />
    )}

    <IconButton
      icon={isTimerRunning ? 'pause' : 'play'}
      color={Colors.green500}
      size={shouldShowMoreControls ? 75 : 100}
      onPress={(): void => toggleTimer(!isTimerRunning)}
      animated
    />

    <IconButton
      icon="restore"
      color={Colors.green500}
      size={shouldShowMoreControls ? 50 : 75}
      onPress={() => toggleReset(true)}
    />

    {shouldShowMoreControls && (
      <IconButton
        icon="skip-next"
        color={Colors.green500}
        size={24}
        onPress={() => {
          setCurrentExercise(getNextExercise());
          toggleReset(true);
        }}
      />
    )}
    <IconButton
      icon="more"
      color={Colors.green500}
      size={shouldShowMoreControls ? 24 : 40}
      onPress={() => {
        setShowMoreControls(!shouldShowMoreControls);
      }}
    />
    {shouldShowMoreControls && (
      <ResetButtonContainer>
        <Button mode="outlined" onPress={resetExercise}>
          Reset Exercise
        </Button>
        <Button mode="outlined" onPress={resetRoutine}>
          Reset Routine
        </Button>
      </ResetButtonContainer>
    )}
  </ControlPanelContainer>
);

export default ControlPanel;
