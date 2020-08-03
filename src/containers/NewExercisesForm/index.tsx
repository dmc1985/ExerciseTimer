import React, { ReactElement, useState } from 'react';
import { Animated, Dimensions } from 'react-native';
import AnimatedDrawer, {
  DRAWER_Z_INDEX,
} from '../../common/components/AnimatedDrawer';
import { useAnimatedDrawer } from '../../common/hooks';
import { addRoutine, NavigationProp } from '../../core/helper';
import { Formik, FormikProps } from 'formik';
import { formatExerciseValues, validate } from './helper';
import {
  BottomButtonContainer,
  Container,
  StyledButton,
} from '../NewRoutineForm/styledComponents';
import AddExerciseForm from './AddExerciseForm';
import { Exercise } from '../../core/typings';
import ExerciseDetail from '../RoutineDetail/ExerciseDetail';
import { removeListItem } from '../../common/helper';
import Screen from '../../core/Screen';
import { StyledHeadline } from './styledComponents';
import { ExerciseValues } from './typings';

export type NewExerciseValues = {
  exercises: Exercise[];
};

export interface Props extends NavigationProp {}

const NewExercisesForm = ({ navigation }: Props): ReactElement => {
  const routineName = navigation.getParam('routineName');
  const secondsBetweenExercises = navigation.getParam(
    'secondsBetweenExercises',
  );
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const toggleShouldReloadList = navigation.getParam('toggleShouldReloadList');

  const {
    toggleDrawer,
    animatedValue,
    opacityAnimation,
    reverseOpacityAnimation,
    isDrawerOpen,
  } = useAnimatedDrawer();

  return (
    <Formik
      initialValues={{
        exercises: [],
      }}
      validate={validate}
      validateOnChange={false}
      onSubmit={async (values: NewExerciseValues): Promise<void> => {
        try {
          await addRoutine({
            name: routineName,
            secondsBetweenExercises: secondsBetweenExercises,
            exercises: values.exercises,
          });
          toggleShouldReloadList(true);
          navigation.navigate(Screen.HomeScreen);
        } catch (err) {
          console.log('err', err);
        }
      }}
    >
      {({ submitForm, values, setValues }: FormikProps<NewExerciseValues>) => {
        if (exercises.length !== values.exercises.length) {
          setValues({ exercises });
        }
        return (
          <>
            <Animated.View
              style={{
                transform: [{ translateX: animatedValue }],
                opacity: opacityAnimation,
                zIndex: DRAWER_Z_INDEX,
                minHeight: Dimensions.get('window').height,
              }}
            >
              <AnimatedDrawer>
                <AddExerciseForm
                  defaultSecondsBeforeNextExercise={secondsBetweenExercises}
                  onSubmit={(values: ExerciseValues, { resetForm }) => {
                    toggleDrawer();
                    setExercises([...exercises, formatExerciseValues(values)]);
                    resetForm();
                  }}
                />
              </AnimatedDrawer>
            </Animated.View>
            <Animated.View style={{ opacity: reverseOpacityAnimation }}>
              <Container>
                {exercises.length === 0 && (
                  <StyledHeadline>
                    This routine contains no exercises
                  </StyledHeadline>
                )}
                {exercises.map(
                  (exercise: Exercise, index: number): ReactElement => (
                    <ExerciseDetail
                      key={`${exercise.name}${index}`}
                      exercise={exercise}
                      handleRemove={() => {
                        setValues({
                          ...values,
                          exercises: removeListItem<Exercise>(
                            values.exercises,
                            index,
                          ),
                        });
                        setExercises(
                          removeListItem<Exercise>(values.exercises, index),
                        );
                      }}
                      hasRemoveOption
                    />
                  ),
                )}
              </Container>
            </Animated.View>
            <BottomButtonContainer>
              <StyledButton onPress={submitForm}>Add Routine</StyledButton>
              <StyledButton onPress={() => toggleDrawer()}>
                {isDrawerOpen ? 'Close Drawer' : 'Add Exercise'}
              </StyledButton>
            </BottomButtonContainer>
          </>
        );
      }}
    </Formik>
  );
};

function navigationOptions({ navigation }: Props) {
  return {
    title: navigation.getParam('routineName'),
    headerTitleStyle: {
      color: 'black',
    },
  };
}

NewExercisesForm.navigationOptions = navigationOptions;

export default NewExercisesForm;
