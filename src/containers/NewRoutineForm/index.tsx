import React, { ReactElement } from 'react';
import { Button, Title } from 'react-native-paper';
import { Container, StyledTextInput } from './styledComponents';
import { Formik, FormikProps } from 'formik';
import Screen from '../../core/Screen';

import { NavigationProp } from '../../core/helper';
import { validate } from './helper';

export interface Props extends NavigationProp {}

export interface NewRoutineValues {
  name: string;
  secondsBetweenExercises: string;
}

const NewRoutineForm = ({ navigation }: Props): ReactElement => (
  <Formik
    initialValues={{ name: '', secondsBetweenExercises: 0 }}
    validate={validate}
    validateOnChange
    onSubmit={(values: NewRoutineValues) => {
      console.log('values', values);
      navigation.navigate(Screen.NewExercisesForm, {
        routineName: values.name,
        secondsBetweenExercises: values.secondsBetweenExercises,
        toggleShouldReloadList: navigation.getParam('toggleShouldReloadList'),
      });
    }}
  >
    {(formikBag: FormikProps<NewRoutineValues>) => (
      <Container>
        <StyledTextInput
          onChangeText={formikBag.handleChange('name')}
          onBlur={formikBag.handleBlur('name')}
          value={formikBag.values.name}
          label="Routine Name"
          error={!!formikBag.errors.name}
        />
        <StyledTextInput
          onChangeText={formikBag.handleChange('secondsBetweenExercises')}
          onBlur={formikBag.handleBlur('secondsBetweenExercises')}
          value={formikBag.values.secondsBetweenExercises}
          label="Seconds Between Exercises"
        />
        <Button onPress={formikBag.submitForm}>Add Exercises to Routine</Button>
      </Container>
    )}
  </Formik>
);

export function navigationOptions() {
  return {
    headerTitle: <Title>Add Routine</Title>,
  };
}

NewRoutineForm.navigationOptions = navigationOptions;

export default NewRoutineForm;
