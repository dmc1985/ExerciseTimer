import { View, Text, ScrollView } from 'react-native';
import styled from 'styled-components';
import { em } from '../../common/helper';

export const Container = styled(ScrollView)`
  height: 100%;
  width: 100%;
  display: flex;
  padding: ${em(2)};
`;

export const ScreenTitle = styled(Text)`
  width: 100%;
  height: ${em(3)}
  font-size: ${em(2)}
`;

export const DetailContainer = styled(View)`
  width: 100%;
  height: ${em(5)}
  display: flex;
`;

export const DetailInfo = styled(Text)`
  width: 100%;
  height: ${em(1.5)};
`;
