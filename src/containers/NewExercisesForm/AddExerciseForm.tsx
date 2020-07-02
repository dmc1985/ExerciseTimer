import React, { ReactElement } from 'react';
import isEmpty from 'lodash/isEmpty';
import { ScrollView } from 'react-native';
import {
  ButtonContainer,
  ExerciseFieldsContainer,
  StyledButton,
} from '../NewRoutineForm/styledComponents';
import { FormikProps, Formik, FormikBag } from 'formik';
import { StyledTextInput } from './styledComponents';
import { ExerciseValues } from './typings';
import { validateExercise } from './helper';

interface Props {
  initialValues?: Partial<ExerciseValues>;
  defaultSecondsBeforeNextExercise: string;
  onSubmit: (
    values: ExerciseValues,
    formikBag: FormikBag<Props, ExerciseValues>,
  ) => void;
}

const AddExerciseForm = ({
  initialValues,
  defaultSecondsBeforeNextExercise,
  onSubmit,
}: Props): ReactElement => {
  return (
    <Formik
      initialValues={{
        name: '',
        numReps: '0',
        repLengthSeconds: '0',
        breakLengthSeconds: '0',
        secondsBeforeNextExercise: defaultSecondsBeforeNextExercise,
        ...initialValues,
      }}
      validate={validateExercise}
      validateOnChange
      onSubmit={onSubmit}
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
              {isEmpty(initialValues) ? 'Add Exercise' : 'Edit Exercise'}
            </StyledButton>
          </ButtonContainer>
        </ExerciseFieldsContainer>
      )}
    </Formik>
  );
};

export default AddExerciseForm;
