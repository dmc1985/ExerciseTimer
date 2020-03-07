import styled from 'styled-components';
import { View } from 'react-native';
import { FAB } from 'react-native-paper';

export const Container = styled(View)`
  height: 100%;
  width: 100%;
`;

export const StyledFAB = styled(FAB)`
  position: absolute;
  right: 10%;
  bottom: 10%;
`;
