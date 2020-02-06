import React, { ReactElement } from 'react';
import { ErrorMessage } from 'formik';
import { ErrorText } from './styledComponents';

interface Props {
  name: string;
}

const FormErrorMessage = ({ name }: Props): ReactElement => (
  <ErrorMessage name={name}>{msg => <ErrorText>{msg}</ErrorText>}</ErrorMessage>
);

export default FormErrorMessage;
