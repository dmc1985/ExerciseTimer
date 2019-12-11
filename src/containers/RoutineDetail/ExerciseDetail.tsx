import React, { ReactElement } from 'react';
import { DetailContainer, DetailInfo } from './styledComponents';
import { Exercise } from '../../core/typings';

interface Props {
  exercise: Exercise;
  showName?: boolean;
}

const ExerciseDetail = ({ exercise, showName = true }: Props): ReactElement => (
  <DetailContainer>
    {showName && <DetailInfo>Exercise Name: {exercise.name}</DetailInfo>}
    <DetailInfo>Number of Reps: {exercise.numReps}</DetailInfo>
    <DetailInfo>Rep Length(s): {exercise.repLengthSeconds}</DetailInfo>
    <DetailInfo>Break Length(s) : {exercise.breakLengthSeconds}</DetailInfo>
  </DetailContainer>
);

export default ExerciseDetail;
