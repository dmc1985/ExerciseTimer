import { Routine } from './typings';
import AsyncStorage from '@react-native-community/async-storage';
import { Nullable } from '../common/typings';
import { NavigationScreenProp } from 'react-navigation';

export interface AddRoutineResult {
  success: boolean;
}

export async function addRoutine(routine: Routine): Promise<AddRoutineResult> {
  try {
    await AsyncStorage.setItem(routine.name, JSON.stringify(routine));
    return { success: true };
  } catch (err) {
    console.log(err);
    return { success: false };
  }
}

export async function getRoutine(
  routineName: string,
): Promise<Nullable<Routine>> {
  try {
    const routine = await AsyncStorage.getItem(routineName);
    if (routine !== null) {
      return JSON.parse(routine);
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getRoutines(
  routineNames: string[],
): Promise<Nullable<Routine[]>> {
  try {
    const routines: Routine[] = [];
    await AsyncStorage.multiGet(routineNames!, (err, stores) => {
      stores!.forEach((result, i, store) => {
        let value = store[i][1];
        routines.push(JSON.parse(value!));
      });
    });
    if (routines) {
      return routines;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getAllRoutineNames(): Promise<Nullable<string[]>> {
  try {
    return AsyncStorage.getAllKeys();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export interface NavigationProp {
  navigation: NavigationScreenProp<{}>;
}

export async function deleteRoutine(routineName: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(routineName);

    console.log(`${routineName} successfully removed`);
  } catch {
    console.log(`error removing ${routineName}`);
  }
}

export async function editRoutine(
  routineName: string,
  update: Partial<Routine>,
): Promise<AddRoutineResult> {
  try {
    await AsyncStorage.mergeItem(routineName, JSON.stringify(update));
    return { success: true };
  } catch (err) {
    console.log(err);
    return { success: false };
  }
}

const PREROUTINE_COUNTDOWN_KEY = 'preroutineCountdown';

export async function setPreroutineCountdownLength(
  length: string,
): Promise<void> {
  try {
    await AsyncStorage.setItem(PREROUTINE_COUNTDOWN_KEY, length);
  } catch (err) {
    console.log(err);
  }
}

export async function getPreroutineCountdownLength(): Promise<number> {
  try {
    const countdownLength = await AsyncStorage.getItem(
      PREROUTINE_COUNTDOWN_KEY,
    );
    if (countdownLength) {
      return +countdownLength;
    }
    return 0;
  } catch (err) {
    console.log(err);
    return 0;
  }
}
