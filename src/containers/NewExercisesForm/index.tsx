import React, { ReactElement, useState } from 'react';
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
          <Container>
            <AddExerciseForm
              exercises={exercises}
              setExercises={setExercises}
              defaultSecondsBeforeNextExercise={secondsBetweenExercises}
            />
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
            <FormErrorMessage name="exercises" />
          </Container>
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
