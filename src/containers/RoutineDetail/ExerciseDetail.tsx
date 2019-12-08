import React, { ReactElement } from 'react';
import { DetailContainer, DetailInfo } from './styledComponents';
import { Exercise } from '../../core/typings';

interface Props {
  exercise: Exercise;
}

const ExerciseDetail = ({ exercise }: Props): ReactElement => (
  <DetailContainer>
    <DetailInfo>Number of Reps: {exercise.numReps}</DetailInfo>
    <DetailInfo>Rep Length(s): {exercise.repLengthSeconds}</DetailInfo>
    <DetailInfo>Break Length(s) : {exercise.breakLengthSeconds}</DetailInfo>
  </DetailContainer>
);

export default ExerciseDetail;
