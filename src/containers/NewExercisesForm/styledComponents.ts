import { ScrollView } from 'react-native';
import { TextInput, Headline } from 'react-native-paper';
import styled from 'styled-components';
import { em } from '../../common/helper';

export const Container = styled(ScrollView)`
  width: 100%;
  height: 100%;
  margin-top: ${em(2)};
`;

export const StyledHeadline = styled(Headline)`
  padding: ${em(5)} ${em(2)};
`;

export const StyledTextInput = styled(TextInput)`
  margin-bottom: ${em(0.5)};
`;
