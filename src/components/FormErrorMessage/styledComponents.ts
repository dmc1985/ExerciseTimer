import styled from 'styled-components';
import { Text } from 'react-native';
import { em } from '../../common/helper';

export const ErrorText = styled(Text)`
  font-size: ${em(1)};
  color: red;
`;
