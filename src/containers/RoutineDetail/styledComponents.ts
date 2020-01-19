import { View, Text, ScrollView, Button } from 'react-native';
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
  display: flex;
  padding: ${em(2)} ${em(1)};
  border: 1px solid red;
`;

export const DetailInfo = styled(Text)`
  width: 100%;
  height: ${em(3)};
`;

export const PerformButton = styled(Button)`
  border: 1px solid green;
  margin-top: ${em(2)};
`;
