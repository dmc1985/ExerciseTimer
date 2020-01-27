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
  ErrorText,
} from './styledComponents';
import { ScreenTitle } from '../RoutineDetail/styledComponents';
import { removeListItem } from '../../common/helper';
import {
  blankExercise,
  validateNewExercise,
  validateNewRoutine,
} from './helper';
import { Values } from './typings';

const NewRoutineForm = (): ReactElement => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [showNewExerciseError, toggleNewExerciseError] = useState<boolean>(
    false,
  );
  return (
    <Formik
      initialValues={{
        name: '',
        exercises: [],
        exerciseToAdd: { ...blankExercise },
      }}
      validate={validateNewRoutine}
      validateOnChange={false}
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
        errors,
      }: FormikProps<Values>) => {
        return (
          <Container>
            <ScreenTitle>Add New Routine</ScreenTitle>
            <InputLabel>Routine Name</InputLabel>
            {errors.name && <ErrorText>{errors.name}</ErrorText>}
            <StyledTextInput
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            {showNewExerciseError && (
              <ErrorText>All New Exercise Fields are required</ErrorText>
            )}
            <NewExerciseForm
              handleChange={handleChange}
              handleBlur={handleBlur}
              values={values}
              errors={errors}
            />
            <StyledButton
              title="Add Exercise"
              onPress={() => {
                if (validateNewExercise(values.exerciseToAdd)) {
                  setValues({
                    ...values,
                    exerciseToAdd: { ...blankExercise },
                    exercises: [...values.exercises, values.exerciseToAdd],
                  });
                  setExercises([...exercises, values.exerciseToAdd]);
                  toggleNewExerciseError(false);
                } else {
                  toggleNewExerciseError(true);
                }
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
            {errors.exercises && <ErrorText>{errors.exercises}</ErrorText>}
            <StyledButton onPress={handleSubmit} title="Add New Routine" />
          </Container>
        );
      }}
    </Formik>
  );
};

export default NewRoutineForm;
