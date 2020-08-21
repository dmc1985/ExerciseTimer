import styled from 'styled-components';
import { ScrollView, View, Text, Platform } from 'react-native';
import { em } from '../../common/helper';

export const HeaderTitleContainer = styled(View)`
  margin-left: ${Platform.OS === 'android' ? em(1) : 0};
`;

export const Container = styled(ScrollView)`
  height: 100%;
  width: 100%;
`;

export const TitleContainer = styled(View)`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled(Text)`
  padding-left: 10px;
  font-size: 16px;
  font-weight: 600;
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
