import { Dimensions, View } from 'react-native';
import styled from 'styled-components';

export const DRAWER_WIDTH = Math.round(Dimensions.get('window').width);

export const DRAWER_Z_INDEX = 100;

const AnimatedDrawer = styled(View)`
  display: flex;
  position: absolute;
  top: 20;
  left: 0;
  bottom: 0;
  width: ${DRAWER_WIDTH};
  height: 200;
`;

export default AnimatedDrawer;
