import 'react-native-gesture-handler';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import DashboardScreen from '../screens/DashboardScreen';
import DetailScreen from '../screens/DetailScreen';

const AppNavigator = createStackNavigator(
  {
    Dashboard: {
      screen: DashboardScreen,
    },
    Detail: {
      screen: DetailScreen,
    },
  },
  {
    initialRouteName: 'Dashboard',
    headerMode: 'none',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
