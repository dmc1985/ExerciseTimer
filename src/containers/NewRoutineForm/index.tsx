import React, { ReactElement } from 'react';
import { Formik, FormikProps } from 'formik';
import { Button, View, Text } from 'react-native';
import { addRoutine, AddRoutineResult } from '../../core/helper';
import { Exercise, sampleRoutine } from '../../core/typings';
import { StyledTextInput } from './styledComponents';

type Values = {
  name: string;
  exercises: Exercise[];
  exerciseToAdd: Exercise;
};

const NewRoutineForm = (): ReactElement => {
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
      }: FormikProps<Values>) => (
        <View>
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
          <Text>Routine Name</Text>
          <StyledTextInput
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
          />

          <Button
            title="Add Exercise"
            onPress={() => {
              setValues({
                ...values,
                exercises: [...values.exercises, values.exerciseToAdd],
              });
              console.log(values);
            }}
          />
          <Button onPress={handleSubmit} title="Add New Routine" />
        </View>
      )}
    </Formik>
  );
};

export default NewRoutineForm;
