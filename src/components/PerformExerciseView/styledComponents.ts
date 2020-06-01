import styled from 'styled-components';
import { Text, View } from 'react-native';
import { em } from '../../common/helper';

export const Container = styled(View)`
  display: flex;
  width: 100%;
  padding: ${em(2)};
`;

export const ExerciseNameContainer = styled(View)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: ${em(1.5)};
`;

export const ExerciseName = styled(Text)`
  font-size: ${em(2)};
`;

export const CurrentRepContainer = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-bottom: ${em(1.5)};
`;

export const InfoTitle = styled(Text)`
  overflow: visible;
  font-size: ${em(1.5)};
`;

export const CurrentRep = styled(Text)`
  overflow: visible;
  font-size: ${em(2.5)};
  font-weight: 700;
  color: red;
`;

export const TotalReps = styled(Text)`
  overflow: visible;
  font-size: ${em(2.5)};
  font-weight: 700;
`;

export const ScreenTitle = styled(Text)`
  width: 100%;
  font-size: ${em(2)};
`;

export const TimeDisplayContainer = styled(View)`
  align-self: center;
  top: 45%;
  height: ${em(6)};
`;

export const TimeDisplay = styled(Text)`
  width: 100%;
  height: ${em(6)}
  font-size: ${em(4)}
`;

export const CircularProgressContainer = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
