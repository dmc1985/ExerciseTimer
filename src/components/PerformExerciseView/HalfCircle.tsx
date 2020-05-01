import React, { ReactElement } from 'react';
import { View } from 'react-native';

interface Props {
  color: string;
}

const RADIUS = 20;

const HalfCircle = ({ color }: Props): ReactElement => (
  <View
    style={{
      width: RADIUS * 2,
      height: RADIUS,
      overflow: 'hidden',
    }}
  >
    <View
      style={{
        backgroundColor: color,
        width: RADIUS * 2,
        height: RADIUS * 2,
        borderRadius: RADIUS,
      }}
    />
  </View>
);

export default HalfCircle;
