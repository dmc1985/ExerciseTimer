import React, { ReactElement, useState } from 'react';
import { Container } from './styledComponents';
import { Button, Text } from 'react-native';
import { Exercise } from '../../core/typings';
import PerformExerciseView from '../../components/PerformExerciseView';
import { NavigationScreenProp } from 'react-navigation';
import { useTimer } from './hooks';

interface Props {
  navigation: NavigationScreenProp<{}>;
}

const PerformExerciseScreen = ({ navigation }: Props): ReactElement => {
  const routine = navigation.getParam('routine');
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);
  const exercise: Exercise = routine.exercises[currentExerciseIndex];
  const [isReset, toggleReset] = useState<boolean>(false);
  const [currentRep, setCurrentRep] = useState<number>(1);
  const [isRoutineFinished, toggleRoutineFinished] = useState<boolean>(false);
  // const [isRepBreak, toggleRepBreak] = useState<boolean>(false);

  const [repTimerRunning, toggleRepTimer] = useState<boolean>(false);
  const [breakTimerRunning, toggleBreakTimer] = useState<boolean>(false);

  const remainingRepTime = useTimer(
    exercise.repLengthSeconds,
    repTimerRunning,
    isReset,
  );

  const remainingBreakTime = useTimer(
    exercise.breakLengthSeconds,
    breakTimerRunning,
    isReset,
  );

  if ((!remainingRepTime || !remainingBreakTime) && !isRoutineFinished) {
    toggleRepTimer(!repTimerRunning);
    toggleBreakTimer(!breakTimerRunning);
    if (!remainingBreakTime) {
      setCurrentRep(currentRep + 1);
    }
  }

  if (currentRep === +exercise.numReps && remainingBreakTime === 0) {
    if (currentExerciseIndex + 1 === routine.exercises.length) {
      toggleBreakTimer(false);
      toggleRoutineFinished(true);
    } else {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setCurrentRep(1);
    }
  }

  if (isReset) {
    setCurrentRep(exercise.numReps);
    toggleReset(false);
  }

  return (
    <Container>
      {isRoutineFinished && <Text>Finished!!</Text>}
      <Text>Routine: {routine.name}</Text>
      <Button
        title={repTimerRunning ? 'Pause' : 'Start'}
        onPress={(): void => toggleRepTimer(!repTimerRunning)}
      />
      <Button title="Reset" onPress={() => toggleReset(true)} />
      <PerformExerciseView
        exercise={exercise}
        currentRep={currentRep}
        timeRemaining={repTimerRunning ? remainingRepTime : remainingBreakTime}
        isRepBreak={!!breakTimerRunning}
      />
    </Container>
  );
};

export default PerformExerciseScreen;
