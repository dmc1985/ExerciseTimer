import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../containers/HomeScreen';
import NewRoutineForm from '../components/NewRoutineForm';
import Screen from '../core/Screen';

const AppNavigator = createStackNavigator(
  {
    [Screen.HomeScreen]: HomeScreen,
    [Screen.NewRoutineForm]: NewRoutineForm,
  },
  { initialRouteName: Screen.HomeScreen },
);

export default AppNavigator;
