import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { em } from '../../../common/helper';

export const Container = styled(TouchableOpacity)`
  height: ${em(3)}
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid black;
  padding: 0 ${em(2)}
`;
