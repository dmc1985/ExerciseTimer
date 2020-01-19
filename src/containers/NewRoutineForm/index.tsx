import React, { ReactElement, useState } from 'react';
import { Formik, FormikProps } from 'formik';
import { addRoutine, AddRoutineResult } from '../../core/helper';
import { Exercise } from '../../core/typings';
import NewExerciseForm from './NewExerciseFields';
import ExerciseDetail from '../RoutineDetail/ExerciseDetail';
import {
  Container,
  StyledButton,
  StyledTextInput,
  InputLabel,
} from './styledComponents';
import { ScreenTitle } from '../RoutineDetail/styledComponents';
import { removeListItem } from '../../common/helper';

type Values = {
  name: string;
  exercises: Exercise[];
  exerciseToAdd: Exercise;
};

const blankExercise: Exercise = {
  name: '',
  numReps: 0,
  repLengthSeconds: 0,
  breakLengthSeconds: 0,
};

const NewRoutineForm = (): ReactElement => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  return (
    <Formik
      initialValues={{
        name: '',
        exercises: [],
        exerciseToAdd: { ...blankExercise },
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
          <Container>
            <ScreenTitle>Add New Routine</ScreenTitle>
            <InputLabel>Routine Name</InputLabel>
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
                  exerciseToAdd: { ...blankExercise },
                  exercises: [...values.exercises, values.exerciseToAdd],
                });
                setExercises([...exercises, values.exerciseToAdd]);
              }}
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
            <StyledButton onPress={handleSubmit} title="Add New Routine" />
          </Container>
        );
      }}
    </Formik>
  );
};

export default NewRoutineForm;
