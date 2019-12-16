import styled from 'styled-components';
import { Text, View } from 'react-native';
import { em } from '../../common/helper';

export const Container = styled(View)`
  height: 100%;
  width: 100%;
`;

export const ScreenTitle = styled(Text)`
  width: 100%;
  height: ${em(3)}
  font-size: ${em(2)}
`;

export const TimeDisplay = styled(Text)`
  width: 100%;
  height: ${em(6)}
  font-size: ${em(4)}
`;
