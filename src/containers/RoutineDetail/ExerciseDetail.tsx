import React, { ReactElement } from 'react';
import { Exercise } from '../../core/typings';
import { Colors, List } from 'react-native-paper';

interface Props {
  exercise: Exercise;
  hasRemoveOption?: boolean;
  handleRemove?: () => void;
}

const ExerciseDetail = ({
  exercise,
  hasRemoveOption = false,
  handleRemove,
}: Props): ReactElement => (
  <List.Section>
    <List.Accordion title={exercise.name}>
      <List.Item title={`Number of Reps: ${exercise.numReps}`} />
      <List.Item title={`Rep Length: ${exercise.repLengthSeconds} seconds`} />
      <List.Item
        title={`Break Length : ${exercise.breakLengthSeconds} seconds`}
      />
      <List.Item
        title={`Seconds Between Exercises : ${exercise.secondsBeforeNextExercise}`}
      />
      {hasRemoveOption && (
        <List.Item
          title="Remove"
          left={() => <List.Icon color={Colors.red100} icon="delete" />}
          onPress={handleRemove}
        />
      )}
    </List.Accordion>
  </List.Section>
);

export default ExerciseDetail;
