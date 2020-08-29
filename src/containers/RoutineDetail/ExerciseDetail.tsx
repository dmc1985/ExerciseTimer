import React, { ReactElement } from 'react';
import { TouchableOpacity } from 'react-native';
import { Exercise } from '../../core/typings';
import { Colors, List } from 'react-native-paper';
import { Container } from './styledComponents';

interface Props {
  exercise: Exercise;
  hasRemoveOption?: boolean;
  handleRemove?: () => void;
  toggleDrawer?: () => void;
}

const ExerciseDetail = ({
  exercise,
  hasRemoveOption = false,
  handleRemove,
  toggleDrawer,
}: Props): ReactElement => (
  <Container>
    <TouchableOpacity
      onLongPress={(): void => {
        if (toggleDrawer) {
          toggleDrawer();
        }
      }}
    >
      <List.Section>
        <List.Accordion title={exercise.name}>
          <List.Item title={`Number of Reps: ${exercise.numReps}`} />
          <List.Item
            title={`Rep Length: ${exercise.repLengthSeconds} seconds`}
          />
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
    </TouchableOpacity>
  </Container>
);

export default ExerciseDetail;
