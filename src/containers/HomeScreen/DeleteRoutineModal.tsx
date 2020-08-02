import React, { ReactElement } from 'react';
import { Button, Modal, Portal } from 'react-native-paper';
import { Text } from 'react-native';
import { Nullable } from '../../common/typings';
import { Routine } from '../../core/typings';
import {
  DeleteModalContentContainer,
  DeleteModalTextContainer,
} from './styledComponents';

interface Props {
  routine: Nullable<Routine>;
  dismissModal: () => void;
  deleteRoutine: () => void;
}

const DeleteRoutineModal = ({
  routine,
  dismissModal,
  deleteRoutine,
}: Props): ReactElement => (
  <Portal>
    <Modal visible={!!routine} dismissable onDismiss={dismissModal}>
      <DeleteModalContentContainer>
        <DeleteModalTextContainer>
          <Text>Delete Routine?</Text>
        </DeleteModalTextContainer>
        <Button
          mode="contained"
          color="red"
          onPress={() => {
            deleteRoutine();
            dismissModal();
          }}
        >
          Delete
        </Button>
      </DeleteModalContentContainer>
    </Modal>
  </Portal>
);

export default DeleteRoutineModal;
