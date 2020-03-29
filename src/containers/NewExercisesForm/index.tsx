import React, { ReactElement, useEffect, useState } from 'react';
import { Animated } from 'react-native';
import { addRoutine, NavigationProp } from '../../core/helper';
import { Formik, FormikProps } from 'formik';
import { validate } from './helper';
import { Container, StyledButton } from '../NewRoutineForm/styledComponents';
import AddExerciseForm from './AddExerciseForm';
import { Exercise } from '../../core/typings';
import ExerciseDetail from '../RoutineDetail/ExerciseDetail';
import { removeListItem } from '../../common/helper';
import Screen from '../../core/Screen';
import FormErrorMessage from '../../components/FormErrorMessage';
import { DRAWER_WIDTH, DrawerContainer } from './styledComponents';

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

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const [opacityAnimation] = useState(new Animated.Value(0));
  const animatedValue = opacityAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-DRAWER_WIDTH, 0],
  });

  useEffect(() => {
    Animated.timing(opacityAnimation, {
      toValue: isDrawerOpen ? 1 : 0,
      duration: 500,
    }).start();
  }, [isDrawerOpen, opacityAnimation]);

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
                zIndex: 100,
              }}
            >
              <DrawerContainer>
                <AddExerciseForm
                  exercises={exercises}
                  setExercises={setExercises}
                  defaultSecondsBeforeNextExercise={secondsBetweenExercises}
                  toggleDrawer={toggleDrawer}
                />
                <StyledButton
                  onPress={() => toggleDrawer()}
                  title="Close Drawer"
                />
              </DrawerContainer>
            </Animated.View>
            <Animated.View style={{ opacity: isDrawerOpen ? 0 : 1 }}>
              <Container>
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
                      isFormInput
                    />
                  ),
                )}
                <StyledButton onPress={submitForm} title="Add New Routine" />
                <StyledButton
                  onPress={() => toggleDrawer()}
                  title="Add Exercise"
                />
                <FormErrorMessage name="exercises" />
              </Container>
            </Animated.View>
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
