import styled from 'styled-components';
import { View } from 'react-native';

export const Container = styled(View)`
  height: 100%;
  width: 100%;
`;

export const ControlPanelContainer = styled(View)`
  position: absolute;
  bottom: 20
  width: 100%;
  flex: 1;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  overflow: visible;
`;

export const ResetButtonContainer = styled(View)`
  display: flex;
  flex-direction: row;
  padding-bottom; 10px;
`;
