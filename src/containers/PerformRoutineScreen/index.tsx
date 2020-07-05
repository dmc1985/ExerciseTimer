import React, { ReactElement, useState } from 'react';
import ControlPanel from './ControlPanel';
import { Container } from './styledComponents';
import { Text } from 'react-native';
import { Routine } from '../../core/typings';
import PerformExerciseView from '../../components/PerformExerciseView';
import { NavigationScreenProp } from 'react-navigation';
import { useExerciseTimer } from './hooks';

interface Props {
  navigation: NavigationScreenProp<{}>;
}

const PerformExerciseScreen = ({ navigation }: Props): ReactElement => {
  const routine = navigation.getParam('routine');

  const [shouldShowMoreControls, setShowMoreControls] = useState(false);

  const {
    isRoutineFinished,
    isTimerRunning,
    currentExercise,
    currentRep,
    timeRemaining,
    getTimerDuration,
    isBreak,
    isExerciseBreak,
    isPreroutineCountdown,
    toggleReset,
    toggleTimer,
    setCurrentExercise,
    getPreviousExercise,
    getNextExercise,
  } = useExerciseTimer(routine);

  return (
    <Container>
      {isRoutineFinished && <Text>Finished!!</Text>}
      <PerformExerciseView
        isTimerRunning={isTimerRunning}
        exercise={currentExercise}
        currentRep={currentRep}
        timeRemaining={timeRemaining}
        timerDuration={getTimerDuration()}
        isBreak={!!isBreak}
        isExerciseBreak={!!isExerciseBreak}
        isPreroutineCountdown={!!isPreroutineCountdown}
      />
      <ControlPanel
        toggleReset={toggleReset}
        isTimerRunning={isTimerRunning}
        toggleTimer={toggleTimer}
        shouldShowMoreControls={shouldShowMoreControls}
        setShowMoreControls={setShowMoreControls}
        setCurrentExercise={setCurrentExercise}
        getPreviousExercise={getPreviousExercise}
        getNextExercise={getNextExercise}
      />
    </Container>
  );
};

function navigationOptions({ navigation }) {
  const routine: Routine = navigation.getParam('routine');

  return {
    headerTitle: <Text>{routine.name}</Text>,
  };
}

PerformExerciseScreen.navigationOptions = navigationOptions;

export default PerformExerciseScreen;
