import React, { ReactElement } from 'react';
import { DetailContainer, DetailInfo } from './styledComponents';
import { Exercise } from '../../core/typings';
import { Button } from 'react-native';

interface Props {
  exercise: Exercise;
  showName?: boolean;
  isFormInput?: boolean;
  handleRemove?: () => void;
}

const ExerciseDetail = ({
  exercise,
  showName = true,
  isFormInput = false,
  handleRemove,
}: Props): ReactElement => (
  <DetailContainer>
    {showName && <DetailInfo>Exercise Name: {exercise.name}</DetailInfo>}
    <DetailInfo>Number of Reps: {exercise.numReps}</DetailInfo>
    <DetailInfo>Rep Length(s): {exercise.repLengthSeconds}</DetailInfo>
    <DetailInfo>Break Length(s) : {exercise.breakLengthSeconds}</DetailInfo>
    {isFormInput && <Button title="Remove" onPress={handleRemove!} />}
  </DetailContainer>
);

export default ExerciseDetail;
