import React, { ReactElement } from 'react';
import { Dimensions } from 'react-native';
import { Circle } from 'react-native-svg';
import Animated, { Value, multiply } from 'react-native-reanimated';
import {
  CircularProgressContainer,
  StyledSvg,
  TimeDisplay,
  TimeDisplayContainer,
} from './styledComponents';

const { width } = Dimensions.get('window');
const size = width - 150;
const strokeWidth = 20;
const radius = (size - strokeWidth) / 2;
const circumference = radius * 2 * Math.PI;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface Props {
  progress: number;
  timeRemaining: number;
}

const CircularProgress = ({ progress, timeRemaining }: Props): ReactElement => {
  const alpha = Animated.interpolate(new Value(progress), {
    inputRange: [0, 1],
    outputRange: [0, Math.PI * 2],
  });
  const strokeDashoffset = multiply(alpha, radius);
  return (
    <CircularProgressContainer>
      <StyledSvg width={size} height={size}>
        <AnimatedCircle
          stroke="blue"
          fill="transparent"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeDasharray={`${circumference} ${circumference}`}
          {...{ strokeDashoffset, strokeWidth }}
        />
        <TimeDisplayContainer>
          <TimeDisplay>{timeRemaining}</TimeDisplay>
        </TimeDisplayContainer>
      </StyledSvg>
    </CircularProgressContainer>
  );
};

export default CircularProgress;
