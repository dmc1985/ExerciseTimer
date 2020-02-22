import React, { ReactElement } from 'react';
import { Container, InputLabel, StyledTextInput } from './styledComponents';
import { Formik, FormikProps } from 'formik';
import { ScreenTitle } from '../RoutineDetail/styledComponents';
import Screen from '../../core/Screen';

import { Button } from 'react-native';

import { NavigationProp } from '../../core/helper';
import { validate } from './helper';
import FormErrorMessage from '../../components/FormErrorMessage';

export interface Props extends NavigationProp {}

export interface NewRoutineValues {
  name: '';
}

const NewRoutineForm = ({ navigation }: Props): ReactElement => (
  <Formik
    initialValues={{ name: '' }}
    validate={validate}
    validateOnChange
    onSubmit={(values: NewRoutineValues) =>
      navigation.navigate(Screen.NewExercisesForm, {
        routineName: values.name,
        toggleShouldReloadList: navigation.getParam('toggleShouldReloadList'),
      })
    }
  >
    {(formikBag: FormikProps<NewRoutineValues>) => (
      <Container>
        <ScreenTitle>Add New Routine</ScreenTitle>
        <InputLabel>Routine Name</InputLabel>
        <StyledTextInput
          onChangeText={formikBag.handleChange('name')}
          onBlur={formikBag.handleBlur('name')}
          value={formikBag.values.name}
        />
        <FormErrorMessage name="name" />
        <Button
          title="Add Exercises to Routine"
          onPress={formikBag.submitForm}
        />
      </Container>
    )}
  </Formik>
);

export default NewRoutineForm;
