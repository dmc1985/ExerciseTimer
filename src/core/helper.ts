import { Routine } from './typings';
import AsyncStorage from '@react-native-community/async-storage';
import { Optional } from '../common/typings';

export interface AddRoutineResult {
  success: boolean;
}

export const ROUTINE_IDS_KEY = 'routine_ids';

export async function addRoutine(
  routine: Routine,
): Promise<Optional<AddRoutineResult>> {
  try {
    await AsyncStorage.setItem(routine.name, JSON.stringify(routine));
    console.log('success!');
    return { success: true };
  } catch (err) {
    console.log(err);
    return { success: false };
  }
}

export async function getRoutine(
  routineName: string,
): Promise<Optional<Routine>> {
  try {
    const routine = await AsyncStorage.getItem(routineName);
    if (routine !== null) {
      console.log(routine);
      return JSON.parse(routine);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getRoutines(
  routineNames: Optional<string[]>,
): Promise<Optional<Routine[]>> {
  try {
    const routines: Routine[] = [];
    await AsyncStorage.multiGet(routineNames!, (err, stores) => {
      stores!.forEach((result, i, store) => {
        let value = store[i][1];
        routines.push(JSON.parse(value));
      });
    });
    if (routines) {
      return routines;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getAllRoutineNames(): Promise<Optional<String[]>> {
  try {
    const allRoutineNames = await AsyncStorage.getAllKeys();
    return allRoutineNames;
  } catch (error) {
    console.log(error);
  }
}
