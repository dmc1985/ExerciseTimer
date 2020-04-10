import { ScrollView } from 'react-native';
import styled from 'styled-components';
import { em } from '../../common/helper';

export const Container = styled(ScrollView)`
  width: 100%;
  display: flex;
  padding: ${em(2)};
`;
