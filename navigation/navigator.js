import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import ProductsMainScreen from '../screens/shop/ProductsMainScreen'
import DetailScreen from '../screens/shop/DetailScreen';
import CartScreen from '../screens/shop/CartScreen'
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductsScreen from '../screens/user/EditProductsScreen';
import StartupScreen from '../screens/StartupScreen';
import Colors from '../constants/Colors';
import AuthScreen from '../screens/user/AuthScreen';
import * as authActions from '../store/actions/auth';

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

const AdminStackNavigator = createStackNavigator({
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

const AuthStackNavigator = createStackNavigator({
  AuthNavigator: AuthScreen
},
{
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
  Admin: {
    screen: AdminStackNavigator,
    navigationOptions: {
      drawerLabel: 'Admin'
    }
  }
},
{
  contentOptions: {
    activeTintColor: Colors.secondary,
    labelStyle: {
      fontFamily: 'open-sans-bold'
    }
  },
  contentComponent: props => {
    const dispatch = useDispatch();
    return (
      <View style={{flex: 1, padding: 20}}>
        <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
          <DrawerNavigatorItems {...props} />
          <Button 
            title="Log Out"
            color={Colors.primary}
            onPress={() => {
              dispatch(authActions.logout());
              // props.navigation.navigate('Auth');
            }}
          />
        </SafeAreaView>
      </View>
    )
  }
});

const MainNavigator = createSwitchNavigator({
  StartUp: StartupScreen,
  Auth: AuthStackNavigator,
  Shop: DrawerNavigator
})

export default createAppContainer(MainNavigator);