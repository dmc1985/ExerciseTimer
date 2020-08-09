import React, { ReactElement, useState } from 'react';
import ControlPanel from './ControlPanel';
import { getNextExercise, getPreviousExercise } from './helper';
import {
  setCurrentExercise,
  setIsTimerRunning,
  setShouldTimerReset,
  setCurrentRep,
  setIsRepBreak,
  setIsExerciseBreak,
  setIsRoutineFinished,
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

  const { state, dispatch, timeRemaining, timerDuration } = useExerciseTimer(
    routine,
  );

  const {
    isPreroutineCountdown,
    currentExercise,
    isTimerRunning,
    currentRep,
    isRoutineFinished,
    isRepBreak,
    isExerciseBreak,
  } = state;

  const resetExercise = (): void => {
    setCurrentRep(dispatch, 1);
    setIsTimerRunning(dispatch, false);
    setShouldTimerReset(dispatch, true);
    setIsRepBreak(dispatch, false);
    setIsExerciseBreak(dispatch, false);
    setIsRoutineFinished(dispatch, false);
  };

  return (
    <Container>
      <PerformExerciseView
        isTimerRunning={isTimerRunning}
        exercise={currentExercise}
        currentRep={currentRep}
        timeRemaining={timeRemaining}
        timerDuration={timerDuration}
        isBreak={isRepBreak}
        isExerciseBreak={isExerciseBreak}
        isPreroutineCountdown={isPreroutineCountdown}
        isRoutineFinished={isRoutineFinished}
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
        getPreviousExercise={() => {
          resetExercise();
          return getPreviousExercise({ routine, currentExercise });
        }}
        getNextExercise={() => {
          resetExercise();
          return getNextExercise({ routine, currentExercise });
        }}
        resetExercise={resetExercise}
        resetRoutine={(): void => {
          setCurrentExercise(dispatch, routine.exercises[0]);
          resetExercise();
        }}
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
