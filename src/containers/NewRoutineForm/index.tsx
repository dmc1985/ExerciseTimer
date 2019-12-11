import React, { ReactElement, useState } from 'react';
import { Formik, FormikProps } from 'formik';
import { Text, View } from 'react-native';
import { addRoutine, AddRoutineResult } from '../../core/helper';
import { Exercise } from '../../core/typings';
import NewExerciseForm from './NewExceriseFields';
import ExerciseDetail from '../RoutineDetail/ExerciseDetail';
import { StyledButton, StyledTextInput } from './styledComponents';
import { ScreenTitle } from '../RoutineDetail/styledComponents';

type Values = {
  name: string;
  exercises: Exercise[];
  exerciseToAdd: Exercise;
};

const NewRoutineForm = (): ReactElement => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  return (
    <Formik
      initialValues={{
        name: '',
        exercises: [],
        exerciseToAdd: {
          name: '',
          numReps: '',
          repLengthSeconds: '',
          breakLengthSeconds: '',
        },
      }}
      onSubmit={(values: Values): Promise<AddRoutineResult> =>
        addRoutine({ name: values.name, exercises: values.exercises })
      }
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        setValues,
      }: FormikProps<Values>) => {
        return (
          <View>
            <ScreenTitle>Add New Routine</ScreenTitle>
            <Text>Routine Name</Text>
            <StyledTextInput
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            <NewExerciseForm
              handleChange={handleChange}
              handleBlur={handleBlur}
              values={values}
            />
            <StyledButton
              title="Add Exercise"
              onPress={() => {
                setValues({
                  ...values,
                  exercises: [...values.exercises, values.exerciseToAdd],
                });
                setExercises([...exercises, values.exerciseToAdd]);
              }}
            />
            {exercises.map(
              (exercise: Exercise): ReactElement => (
                <ExerciseDetail exercise={exercise} />
              ),
            )}
            <StyledButton onPress={handleSubmit} title="Add New Routine" />
          </View>
        );
      }}
    </Formik>
  );
};

export default NewRoutineForm;
