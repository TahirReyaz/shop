import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import ProductsMainScreen from '../screens/shop/ProductsMainScreen'

const StackNavigator = createStackNavigator({
  MainScreen: ProductsMainScreen
});

export default createAppContainer(StackNavigator);