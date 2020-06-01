import React, { PropsWithChildren, ReactElement } from 'react';
import { Dimensions } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, { Value, multiply } from 'react-native-reanimated';
import { CircularProgressContainer } from './styledComponents';

const { width } = Dimensions.get('window');
const size = width - 200;
const strokeWidth = 10;
const radius = (size - strokeWidth) / 2;
const circumference = radius * 2 * Math.PI;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface Props extends PropsWithChildren<{}> {
  progress: number;
}

const CircularProgress = ({ progress, children }: Props): ReactElement => {
  const alpha = Animated.interpolate(new Value(progress), {
    inputRange: [0, 1],
    outputRange: [0, Math.PI * 2],
  });
  const strokeDashoffset = multiply(alpha, radius);
  return (
    <CircularProgressContainer>
      <Svg width={size} height={size}>
        <AnimatedCircle
          stroke="blue"
          fill="transparent"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeDasharray={`${circumference} ${circumference}`}
          {...{ strokeDashoffset, strokeWidth }}
        />
        {children}
      </Svg>
    </CircularProgressContainer>
  );
};

export default CircularProgress;
