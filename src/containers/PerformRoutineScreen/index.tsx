import React, { ReactElement, useState } from 'react';
import ControlPanel from './ControlPanel';
import {
  getNextExercise,
  getPreviousExercise,
  getTimerDuration,
} from './helper';
import {
  setCurrentExercise,
  setIsTimerRunning,
  setShouldTimerReset,
} from './store/actions';
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

  const { store, dispatch, timeRemaining } = useExerciseTimer(routine);

  const {
    isPreroutineCountdown,
    currentExercise,
    isTimerRunning,
    currentRep,
    isRoutineFinished,
    isRepBreak,
    isExerciseBreak,
  } = store;

  return (
    <Container>
      {isRoutineFinished && <Text>Finished!!</Text>}
      <PerformExerciseView
        isTimerRunning={isTimerRunning}
        exercise={currentExercise}
        currentRep={currentRep}
        timeRemaining={timeRemaining}
        timerDuration={getTimerDuration({
          isPreroutineCountdown,
          isRepBreak,
          isExerciseBreak,
          currentExercise,
        })}
        isBreak={!!isRepBreak}
        isExerciseBreak={!!isExerciseBreak}
        isPreroutineCountdown={!!isPreroutineCountdown}
      />
      <ControlPanel
        toggleReset={isTimerRunning =>
          setShouldTimerReset(dispatch, isTimerRunning)
        }
        isTimerRunning={isTimerRunning}
        toggleTimer={() => setIsTimerRunning(dispatch, !isTimerRunning)}
        shouldShowMoreControls={shouldShowMoreControls}
        setShowMoreControls={setShowMoreControls}
        setCurrentExercise={exercise => setCurrentExercise(dispatch, exercise)}
        getPreviousExercise={() =>
          getPreviousExercise({ routine, currentExercise })
        }
        getNextExercise={() => getNextExercise({ routine, currentExercise })}
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
