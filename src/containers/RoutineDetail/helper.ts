import { FormikBag } from 'formik';
import { Dispatch, SetStateAction } from 'react';
import { editRoutine } from '../../core/helper';
import { Exercise, Routine } from '../../core/typings';
import { formatExerciseValues } from '../NewExercisesForm/helper';
import { ExerciseValues } from '../NewExercisesForm/typings';

export function formatInitialValues(
  initialValues: Exercise,
): Partial<ExerciseValues> {
  const initialValuesKeys = Object.keys(initialValues);
  const formattedValues: Partial<ExerciseValues> = {};

  initialValuesKeys.forEach((key: keyof Exercise) => {
    formattedValues[key] = initialValues[key].toString();
  });

  return formattedValues;
}

interface HandleSubmitParams {
  toggleDrawer: () => void;
  routine: Routine;
  setShouldRefreshRoutine: Dispatch<SetStateAction<boolean>>;
  exerciseIndex: number;
}

export function handleSubmit({
  routine,
  toggleDrawer,
  exerciseIndex,
  setShouldRefreshRoutine,
}: HandleSubmitParams): (
  values: ExerciseValues,
  formikBag: FormikBag<{}, ExerciseValues>,
) => Promise<void> {
  return async function(values: ExerciseValues): Promise<void> {
    toggleDrawer();
    const updatedExercises = routine.exercises.map(
      (exercise: Exercise, index: number) => {
        if (index === exerciseIndex) {
          return formatExerciseValues(values);
        }
        return exercise;
      },
    );

    await editRoutine(routine.name, { exercises: updatedExercises });
    setShouldRefreshRoutine(true);
  };
}
