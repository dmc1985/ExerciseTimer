import { Dimensions, ScrollView, View } from 'react-native';
import { TextInput, Headline } from 'react-native-paper';
import styled from 'styled-components';
import { em } from '../../common/helper';

export const Container = styled(ScrollView)`
  width: 100%;
  height: 100%;
  margin-top: ${em(2)};
`;

export const StyledHeadline = styled(Headline)`
  padding: ${em(5)} ${em(2)};
`;

export const StyledTextInput = styled(TextInput)`
  margin-bottom: ${em(0.5)};
`;

export const DRAWER_WIDTH = Math.round(Dimensions.get('window').width);

export const DrawerContainer = styled(View)`
  display: flex;
  position: absolute;
  top: 20;
  left: 0;
  bottom: 0;
  width: ${DRAWER_WIDTH};
  height: 200;
`;
