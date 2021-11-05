import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import ProductsMainScreen from '../screens/shop/ProductsMainScreen'
import DetailScreen from '../screens/shop/DetailScreen';
import Colors from '../constants/Colors';

const StackNavigator = createStackNavigator({
  MainScreen: ProductsMainScreen,
  Details: DetailScreen
},
{
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
  }
}
);

export default createAppContainer(StackNavigator);