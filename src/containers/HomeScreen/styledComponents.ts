import styled from 'styled-components';
import { Button, View } from 'react-native';
import { em } from '../../common/helper';

export const Container = styled(View)`
  height: 100%;
  width: 100%;
`;

export const StyledButton = styled(Button)`
  height: ${em(6)};
  width: 100%;
`;
