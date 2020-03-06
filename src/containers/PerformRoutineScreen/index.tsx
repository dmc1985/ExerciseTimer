import React, { ReactElement, useEffect, useState } from 'react';
import { Container } from './styledComponents';
import { Button, Text } from 'react-native';
import { Exercise } from '../../core/typings';
import PerformExerciseView from '../../components/PerformExerciseView';
import { NavigationScreenProp } from 'react-navigation';
import { useTimer } from './hooks';
import isEqual from 'lodash/isEqual';
import { playSound } from './helper';

interface Props {
  navigation: NavigationScreenProp<{}>;
}

const PerformExerciseScreen = ({ navigation }: Props): ReactElement => {
  const routine = navigation.getParam('routine');

  const [currentExercise, setCurrentExercise] = useState<Exercise>(
    routine.exercises[0],
  );
  const [isTimerRunning, toggleTimer] = useState<boolean>(false);
  const [currentRep, setCurrentRep] = useState<number>(1);
  const [isRoutineFinished, toggleRoutineFinished] = useState<boolean>(false);
  const [isReset, toggleReset] = useState<boolean>(false);
  const [isBreak, toggleBreak] = useState<boolean>(false);
  const [isExerciseBreak, toggleExerciseBreak] = useState<boolean>(false);

  const timeRemaining = useTimer(
    getTimerDuration(),
    // isBreak
    //   ? currentExercise.breakLengthSeconds
    //   : currentExercise.repLengthSeconds,
    isTimerRunning,
    isReset,
  );

  function getCurrentExerciseIndex(): number {
    return routine.exercises.findIndex((exercise: Exercise) =>
      isEqual(exercise, currentExercise),
    );
  }

  function getTimerDuration(): number {
    if (isExerciseBreak) {
      return currentExercise.secondsBeforeNextExercise;
    }
    if (isBreak) {
      return currentExercise.breakLengthSeconds;
    }
    return currentExercise.repLengthSeconds;
  }

  function getNextExercise() {
    const currentIndex: number = getCurrentExerciseIndex();

    if (currentIndex === -1 || currentIndex + 1 >= routine.exercises.length) {
      return routine.exercises[0];
    }
    return routine.exercises[currentIndex + 1];
  }

  useEffect(() => {
    if (timeRemaining === 0) {
      if (!isExerciseBreak) {
        toggleBreak(!isBreak);
        if (!isBreak) {
          playSound('break');
        }
      }
      toggleReset(true);
      if (isExerciseBreak) {
        setCurrentExercise(getNextExercise());
        setCurrentRep(1);
        toggleReset(true);
        toggleExerciseBreak(false);
        playSound('change');
      }

      if (isBreak) {
        if (currentRep < currentExercise.numReps) {
          setCurrentRep(currentRep + 1);
          toggleReset(true);
          playSound('next');
        } else {
          if (getCurrentExerciseIndex() === routine.exercises.length - 1) {
            toggleRoutineFinished(true);
            toggleTimer(false);
            playSound('finished');
          } else {
            console.log('exer break?', isExerciseBreak);
            if (!isExerciseBreak) {
              toggleExerciseBreak(true);
              toggleReset(true);
            }
            if (isExerciseBreak) {
              console.log('hihi!');
              setCurrentExercise(getNextExercise());
              setCurrentRep(1);
              toggleReset(true);
              toggleExerciseBreak(false);
              playSound('change');
            }
          }
        }
      }
    }
  }, [
    timeRemaining,
    isBreak,
    currentRep,
    currentExercise.numReps,
    getNextExercise,
    currentExercise,
    getCurrentExerciseIndex,
    routine.exercises.length,
    isExerciseBreak,
  ]);

  if (isReset) {
    toggleReset(false);
  }

  return (
    <Container>
      {isRoutineFinished && <Text>Finished!!</Text>}
      <Text>Routine: {routine.name}</Text>
      <Button
        title={isTimerRunning ? 'Pause' : 'Start'}
        onPress={(): void => toggleTimer(!isTimerRunning)}
      />
      <Button title="Reset" onPress={() => toggleReset(true)} />
      <Button
        title="Next Exercise"
        onPress={() => {
          setCurrentExercise(getNextExercise());
          toggleReset(true);
        }}
      />
      <PerformExerciseView
        exercise={currentExercise}
        currentRep={currentRep}
        timeRemaining={timeRemaining}
        isBreak={!!isBreak}
        isExerciseBreak={!!isExerciseBreak}
      />
    </Container>
  );
};

export default PerformExerciseScreen;
