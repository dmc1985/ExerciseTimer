import styled from 'styled-components';
import { ScrollView, View } from 'react-native';

export const Container = styled(ScrollView)`
  height: 100%;
  width: 100%;
`;

export const DeleteModalContentContainer = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 20px;
  height: 100;
  background-color: white;
`;

export const DeleteModalTextContainer = styled(View)`
  margin: 10px 0;
`;
