import { Headline } from 'react-native-paper';
import styled from 'styled-components';
import { Text, View } from 'react-native';
import Svg from 'react-native-svg';
import { em } from '../../common/helper';

export const Container = styled(View)`
  width: 100%;
  padding: ${em(2)};
`;

export const ExerciseName = styled(Headline)`
  margin-bottom: ${em(1.5)};
  font-size: ${em(2.5)};
`;

export const CurrentRep = styled(Headline)`
  margin-bottom: ${em(1.5)};
  font-size: ${em(3)};
  overflow: visible;
`;

export const ScreenTitle = styled(Text)`
  width: 100%;
  height: ${em(3)}
  font-size: ${em(2)}
`;

export const TimeDisplayContainer = styled(View)`
  align-self: center;
  height: ${em(6)}
  padding-top: ${em(6)};
`;

export const TimeDisplay = styled(Text)`
  width: 100%;
  height: ${em(6)}
  font-size: ${em(4)}
`;

export const CircularProgressContainer = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const StyledSvg = styled(Svg)`
  height: 200;
  width: 200;
`;
