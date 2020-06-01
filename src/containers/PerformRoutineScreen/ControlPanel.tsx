import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import { Colors, IconButton } from 'react-native-paper';
import { Exercise } from '../../core/typings';
import { ControlPanelContainer } from './styledComponents';

interface Props {
  toggleReset: Dispatch<SetStateAction<boolean>>;
  isTimerRunning: boolean;
  toggleTimer: Dispatch<SetStateAction<boolean>>;
  shouldShowMoreControls: boolean;
  setShowMoreControls: Dispatch<SetStateAction<boolean>>;
  setCurrentExercise: Dispatch<SetStateAction<Exercise>>;
  getPreviousExercise: () => Exercise;
  getNextExercise: () => Exercise;
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
  </ControlPanelContainer>
);

export default ControlPanel;
