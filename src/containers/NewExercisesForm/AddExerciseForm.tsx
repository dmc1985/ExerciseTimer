import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import {
  ButtonContainer,
  ExerciseFieldsContainer,
  StyledButton,
} from '../NewRoutineForm/styledComponents';
import { FormikProps, Formik } from 'formik';
import { Exercise } from '../../core/typings';
import { StyledTextInput } from './styledComponents';
import { ExerciseValues } from './typings';
import { formatExerciseValues, validateExercise } from './helper';

interface Props {
  exercises: Exercise[];
  setExercises: Dispatch<SetStateAction<Exercise[]>>;
  defaultSecondsBeforeNextExercise: string;
  toggleDrawer: () => void;
}

const AddExerciseForm = ({
  exercises,
  setExercises,
  defaultSecondsBeforeNextExercise,
  toggleDrawer,
}: Props): ReactElement => (
  <Formik
    initialValues={{
      name: '',
      numReps: '0',
      repLengthSeconds: '0',
      breakLengthSeconds: '0',
      secondsBeforeNextExercise: defaultSecondsBeforeNextExercise,
    }}
    validate={validateExercise}
    validateOnChange
    onSubmit={(values: ExerciseValues, { resetForm }) => {
      toggleDrawer();
      setExercises([...exercises, formatExerciseValues(values)]);
      resetForm();
    }}
  >
    {({
      handleChange,
      handleBlur,
      values,
      submitForm,
      errors,
    }: FormikProps<ExerciseValues>): ReactElement => (
      <ExerciseFieldsContainer>
        <StyledTextInput
          label="Exercise Name"
          onChangeText={handleChange('name')}
          onBlur={handleBlur('name')}
          value={values.name}
          error={!!errors.name}
        />
        <StyledTextInput
          label="Number of reps"
          onChangeText={handleChange('numReps')}
          onBlur={handleBlur('numReps')}
          value={values.numReps}
          error={!!errors.numReps}
          keyboardType="number-pad"
        />
        <StyledTextInput
          label="Rep Length (seconds)"
          onChangeText={handleChange('repLengthSeconds')}
          onBlur={handleBlur('repLengthSeconds')}
          value={values.repLengthSeconds}
          error={!!errors.repLengthSeconds}
          keyboardType="number-pad"
        />
        <StyledTextInput
          label="Break Length (seconds)"
          onChangeText={handleChange('breakLengthSeconds')}
          onBlur={handleBlur('breakLengthSeconds')}
          value={values.breakLengthSeconds}
          error={!!errors.breakLengthSeconds}
          keyboardType="number-pad"
        />
        <StyledTextInput
          label="Seconds before next exercise"
          onChangeText={handleChange('secondsBeforeNextExercise')}
          onBlur={handleBlur('secondsBeforeNextExercise')}
          value={values.secondsBeforeNextExercise}
          error={!!errors.secondsBeforeNextExercise}
          keyboardType="number-pad"
        />
        <ButtonContainer>
          <StyledButton mode="contained" onPress={submitForm}>
            Add Exercise
          </StyledButton>
        </ButtonContainer>
      </ExerciseFieldsContainer>
    )}
  </Formik>
);

export default AddExerciseForm;
