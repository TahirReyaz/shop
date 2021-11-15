import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import ProductsMainScreen from '../screens/shop/ProductsMainScreen'
import DetailScreen from '../screens/shop/DetailScreen';
import CartScreen from '../screens/shop/CartScreen'
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductsScreen from '../screens/user/EditProductsScreen';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const ProductsStackNavigator = createStackNavigator({
  MainScreen: ProductsMainScreen,
  Details: DetailScreen,
  Cart: CartScreen
},
{
  navigationOptions: {
    drawerIcon: drawerConfig => (
      <Ionicons
        name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
        size={23}
        color={drawerConfig.tintColor}
      />
    )
  },
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
  }
});

const UserStackNavigator = createStackNavigator({
  ProductsScreen: UserProductsScreen,
  EditScreen: EditProductsScreen
},
{
  navigationOptions: {
    drawerIcon: drawerConfig => (
      <Ionicons
        name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
        size={23}
        color={drawerConfig.tintColor}
      />
    )
  },
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
  }
});

const OrdersStackNavigator = createStackNavigator({
  Orders: OrdersScreen
},
{
  navigationOptions: {
    drawerIcon: drawerConfig => (
      <Ionicons
        name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
        size={23}
        color={drawerConfig.tintColor}
      />
    )
  },
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
  }
});

const DrawerNavigator = createDrawerNavigator({
  Products: {
    screen: ProductsStackNavigator,
    navigationOptions: {
      drawerLabel: 'Products'
    }
  },
  Orders: {
    screen: OrdersStackNavigator,
    navigationOptions: {
      drawerLabel: 'Orders'
    }
  },
  User: {
    screen: UserStackNavigator,
    navigationOptions: {
      drawerLabel: 'User'
    }
  }
},
{
  contentOptions: {
    activeTintColor: Colors.secondary,
    labelStyle: {
      fontFamily: 'open-sans-bold'
    }
  }
});

export default createAppContainer(DrawerNavigator);