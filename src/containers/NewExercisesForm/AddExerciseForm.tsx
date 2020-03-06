import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import {
  ExerciseFieldsContainer,
  InputLabel,
  StyledButton,
  StyledTextInput,
} from '../NewRoutineForm/styledComponents';
import { FormikProps, Formik } from 'formik';
import { Exercise } from '../../core/typings';
import { ExerciseValues } from './typings';
import { formatExerciseValues, validateExercise } from './helper';
import FormErrorMessage from '../../components/FormErrorMessage';

interface Props {
  exercises: Exercise[];
  setExercises: Dispatch<SetStateAction<Exercise[]>>;
  defaultSecondsBeforeNextExercise: string;
}

const AddExerciseForm = ({
  exercises,
  setExercises,
  defaultSecondsBeforeNextExercise,
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
      setExercises([...exercises, formatExerciseValues(values)]);
      resetForm();
    }}
  >
    {({
      handleChange,
      handleBlur,
      values,
      submitForm,
    }: FormikProps<ExerciseValues>): ReactElement => (
      <ExerciseFieldsContainer>
        <InputLabel>Exercise Name</InputLabel>
        <FormErrorMessage name="name" />
        <StyledTextInput
          onChangeText={handleChange('name')}
          onBlur={handleBlur('name')}
          value={values.name}
        />
        <InputLabel>Number of reps</InputLabel>
        <FormErrorMessage name="numReps" />
        <StyledTextInput
          onChangeText={handleChange('numReps')}
          onBlur={handleBlur('numReps')}
          value={values.numReps}
        />
        <InputLabel>Rep Length (seconds)</InputLabel>
        <FormErrorMessage name="repLengthSeconds" />
        <StyledTextInput
          onChangeText={handleChange('repLengthSeconds')}
          onBlur={handleBlur('repLengthSeconds')}
          value={values.repLengthSeconds}
        />
        <InputLabel>Break Length (seconds)</InputLabel>
        <FormErrorMessage name="breakLengthSeconds" />
        <StyledTextInput
          onChangeText={handleChange('breakLengthSeconds')}
          onBlur={handleBlur('breakLengthSeconds')}
          value={values.breakLengthSeconds}
        />
        <InputLabel>Seconds before next exercise</InputLabel>
        <FormErrorMessage name="breakLengthSeconds" />
        <StyledTextInput
          onChangeText={handleChange('secondsBeforeNextExercise')}
          onBlur={handleBlur('secondsBeforeNextExercise')}
          value={values.secondsBeforeNextExercise}
        />
        <StyledButton title="Add Exercise" onPress={submitForm} />
      </ExerciseFieldsContainer>
    )}
  </Formik>
);

export default AddExerciseForm;
