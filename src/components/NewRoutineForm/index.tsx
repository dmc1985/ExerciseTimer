import React, { ReactElement } from 'react';
import { Formik, FormikProps } from 'formik';
import { Button, View, Text } from 'react-native';
import {
  addRoutine,
  AddRoutineResult,
  getAllRoutineNames,
  getRoutine,
} from '../../core/helper';
import { sampleRoutine } from '../../core/typings';
import { StyledTextInput } from './styledComponents';

type ValuesType = {
  name: string;
};

const NewRoutineForm = (): ReactElement => {
  return (
    <Formik
      initialValues={{ name: '' }}
      onSubmit={(): Promise<AddRoutineResult> => addRoutine(sampleRoutine)}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
      }: FormikProps<ValuesType>) => (
        <View>
          <Text>Exercise Timer!aa!</Text>
          <Text>Saved Routines</Text>

          <StyledTextInput
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
          />
          <Button
            title="Get All Routines"
            onPress={() => getAllRoutineNames()}
          />
          <Button
            title="get routine"
            onPress={() => getRoutine(sampleRoutine.name)}
          />
          <Button onPress={handleSubmit} title="Submit" />
        </View>
      )}
    </Formik>
  );
};

export default NewRoutineForm;
