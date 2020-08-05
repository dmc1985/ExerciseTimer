import React, { ReactElement, useEffect, useState } from 'react';
import { Animated, Dimensions, Platform, Text } from 'react-native';
import AnimatedDrawer, {
  DRAWER_Z_INDEX,
} from '../../common/components/AnimatedDrawer';
import FloatingActionButton from '../../common/components/FloatingActionButton';
import { useAnimatedDrawer } from '../../common/hooks';
import { Nullable } from '../../common/typings';
import { getRoutine } from '../../core/helper';
import AddExerciseForm from '../NewExercisesForm/AddExerciseForm';
import { formatInitialValues, handleSubmit } from './helper';
import { Container } from './styledComponents';
import { NavigationScreenProp } from 'react-navigation';
import { Exercise, Routine } from '../../core/typings';
import ExerciseDetail from './ExerciseDetail';
import Screen from '../../core/Screen';

interface Props {
  navigation: NavigationScreenProp<{}>;
}

const RoutineDetail = ({ navigation }: Props): ReactElement => {
  const [routine, setRoutine] = useState<Routine>(
    navigation.getParam('routine'),
  );
  const [selectedExercise, setSelectedExercise] = useState<Nullable<Exercise>>(
    null,
  );
  const [selectedExerciseIndex, setExerciseIndex] = useState<number>();
  const [shouldRefreshRoutine, setShouldRefreshRoutine] = useState(false);

  const {
    toggleDrawer,
    animatedValue,
    opacityAnimation,
    reverseOpacityAnimation,
    isDrawerOpen,
  } = useAnimatedDrawer();

  useEffect(() => {
    async function updateRoutine() {
      if (shouldRefreshRoutine) {
        const updatedRoutine = await getRoutine(routine.name);
        setRoutine(updatedRoutine!);
      }
    }

    updateRoutine();
    setShouldRefreshRoutine(false);
  }, [shouldRefreshRoutine, routine.name]);

  return (
    <>
      {selectedExercise && (Platform.OS === 'ios' || isDrawerOpen) && (
        <Animated.View
          style={{
            transform: [{ translateX: animatedValue }],
            opacity: opacityAnimation,
            zIndex: DRAWER_Z_INDEX,
            minHeight:
              Platform.OS === 'android'
                ? Dimensions.get('window').height
                : 'auto',
          }}
        >
          <AnimatedDrawer>
            <AddExerciseForm
              initialValues={formatInitialValues(selectedExercise)}
              defaultSecondsBeforeNextExercise={routine.secondsBetweenExercises.toString()}
              onSubmit={handleSubmit({
                routine,
                toggleDrawer,
                setShouldRefreshRoutine,
                exerciseIndex: selectedExerciseIndex!,
              })}
            />
          </AnimatedDrawer>
        </Animated.View>
      )}
      <Animated.View style={{ opacity: reverseOpacityAnimation }}>
        <Container>
          {routine.exercises.map(
            (exercise: Exercise, index: number): ReactElement => (
              <ExerciseDetail
                exercise={exercise}
                key={exercise.name}
                toggleDrawer={() => {
                  setSelectedExercise(exercise);
                  setExerciseIndex(index);
                  toggleDrawer();
                }}
              />
            ),
          )}
        </Container>
      </Animated.View>
      <FloatingActionButton
        small
        icon="play"
        onPress={() =>
          navigation.navigate(Screen.PerformRoutineScreen, { routine })
        }
      />
    </>
  );
};

export function navigationOptions({ navigation }) {
  const routine: Routine = navigation.getParam('routine');
  return {
    headerTitle: <Text>{routine.name}</Text>,
  };
}

RoutineDetail.navigationOptions = navigationOptions;

export default RoutineDetail;
