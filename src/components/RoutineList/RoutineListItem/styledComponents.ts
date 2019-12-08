import { View } from 'react-native';
import styled from 'styled-components';
import { em } from '../../../common/helper';

export const Container = styled(View)`
  height: ${em(3)}
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`;
