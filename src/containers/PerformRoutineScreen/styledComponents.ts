import styled from 'styled-components';
import { View } from 'react-native';

export const Container = styled(View)`
  height: 100%;
  width: 100%;
`;

export const ButtonContainer = styled(View)`
  position: absolute;
  bottom: 0
  width: 100%;
  flex: 1;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`;
