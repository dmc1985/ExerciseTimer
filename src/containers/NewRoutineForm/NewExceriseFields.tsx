import React, { ReactElement } from 'react';
import { Text } from 'react-native';
import { ExerciseFieldsContainer, StyledTextInput } from './styledComponents';
import { FormikProps } from 'formik';
import { Exercise } from '../../core/typings';

export interface Values {
  name: string;
  exercises: Exercise[];
  exerciseToAdd: Exercise;
}

const NewExerciseFields = ({
  handleChange,
  handleBlur,
  values,
}: FormikProps<Values>): ReactElement => (
  <ExerciseFieldsContainer>
    <Text>Exercise Name</Text>
    <StyledTextInput
      onChangeText={handleChange('exerciseToAdd.name')}
      onBlur={handleBlur('exerciseToAdd.name')}
      value={values.exerciseToAdd.name}
    />
    <Text>Number of reps</Text>
    <StyledTextInput
      onChangeText={handleChange('exerciseToAdd.numReps')}
      onBlur={handleBlur('exerciseToAdd.numReps')}
      value={values.exerciseToAdd.numReps}
    />
    <Text>Rep Length (seconds)</Text>
    <StyledTextInput
      onChangeText={handleChange('exerciseToAdd.repLengthSeconds')}
      onBlur={handleBlur('exerciseToAdd.repLengthSeconds')}
      value={values.exerciseToAdd.repLengthSeconds}
    />
    <Text>Break Length (seconds)</Text>
    <StyledTextInput
      onChangeText={handleChange('exerciseToAdd.breakLengthSeconds')}
      onBlur={handleBlur('exerciseToAdd.breakLengthSeconds')}
      value={values.exerciseToAdd.breakLengthSeconds}
    />
  </ExerciseFieldsContainer>
);

export default NewExerciseFields;
