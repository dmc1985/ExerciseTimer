import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../containers/HomeScreen';
import NewRoutineForm from '../containers/NewRoutineForm';
import Screen from '../core/Screen';
import RoutineDetail from '../containers/RoutineDetail';

const AppNavigator = createStackNavigator(
  {
    [Screen.HomeScreen]: HomeScreen,
    [Screen.NewRoutineForm]: NewRoutineForm,
    [Screen.RoutineDetail]: RoutineDetail,
  },
  { initialRouteName: Screen.HomeScreen },
);

export default AppNavigator;
