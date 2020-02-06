import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../containers/HomeScreen';
import NewRoutineForm from '../containers/NewRoutineForm/index';
import Screen from '../core/Screen';
import RoutineDetail from '../containers/RoutineDetail';
import PerformRoutineScreen from '../containers/PerformRoutineScreen';
import NewExercisesForm from '../containers/NewExercisesForm';

const AppNavigator = createStackNavigator(
  {
    [Screen.HomeScreen]: HomeScreen,
    [Screen.NewRoutineForm]: NewRoutineForm,
    [Screen.NewExercisesForm]: NewExercisesForm,
    [Screen.RoutineDetail]: RoutineDetail,
    [Screen.PerformRoutineScreen]: PerformRoutineScreen,
  },
  { initialRouteName: Screen.HomeScreen },
);

export default AppNavigator;
