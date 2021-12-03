import React from 'react';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import ProductsMainScreen, { screenOptions as prodScreenOptions } from '../screens/shop/ProductsMainScreen';
import DetailScreen, { screenOptions as detailsScreenOptions } from '../screens/shop/DetailScreen';
import CartScreen, { screenOptions as cartScreenOptions } from '../screens/shop/CartScreen'
import OrdersScreen, { screenOptions as ordersScreenOptions } from '../screens/shop/OrdersScreen';
import UserProductsScreen, { screenOptions as userProdScreenOptions } from '../screens/user/UserProductsScreen';
import EditProductsScreen, { screenOptions as editProdScreenOptions } from '../screens/user/EditProductsScreen';
import Colors from '../constants/Colors';
import AuthScreen, { screenOptions as authScreenOptions } from '../screens/user/AuthScreen';
import * as authActions from '../store/actions/auth';

const defaultNavigationOptions= {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const ProductsStackNavigator = createStackNavigator();

const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
      <ProductsStackNavigator.Screen 
        name="MainScreen" 
        component={ProductsMainScreen} 
        options={prodScreenOptions}
      />
      <ProductsStackNavigator.Screen 
        name="Details" 
        component={DetailScreen} 
        options={detailsScreenOptions}
      />
      <ProductsStackNavigator.Screen 
        name="Cart" 
        component={CartScreen} 
        options={cartScreenOptions}
      />
    </ProductsStackNavigator.Navigator>
  );
}

const AdminStackNavigator = createStackNavigator();

const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
      <AdminStackNavigator.Screen 
        name="UserProductsScreen" 
        component={UserProductsScreen} 
        options={userProdScreenOptions}
      />
      <AdminStackNavigator.Screen 
        name="EditScreen" 
        component={EditProductsScreen} 
        options={editProdScreenOptions}
      />
    </AdminStackNavigator.Navigator>
  );
}

const OrdersStackNavigator = createStackNavigator();

const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
      <OrdersStackNavigator.Screen 
        name="OrderStack" 
        component={OrdersScreen} 
        options={ordersScreenOptions}
      />
    </OrdersStackNavigator.Navigator>
  );
}

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return(
    <AuthStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
      <AuthStackNavigator.Screen 
        name="AuthNavigator" 
        component={AuthScreen} 
        options={authScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
}

const DrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
  const dispatch = useDispatch();
  return (
    <DrawerNavigator.Navigator
      drawerContent={props => {
        return (
          <View style={{flex: 1, padding: 20}}>
            <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
              <DrawerItemList {...props} />
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
        );
      }}
      screenOptions={{
        drawerActiveTintColor: Colors.secondary,
        headerShown: false
      }}
    >
      <DrawerNavigator.Screen 
        name="Products" 
        component={ProductsNavigator} 
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              size={23}
              color={props.color}
            />
          )
        }} 
      />
      <DrawerNavigator.Screen 
        name="Orders" 
        component={OrdersNavigator} 
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
              size={23}
              color={props.color}
            />
          )
        }} 
      />
      <DrawerNavigator.Screen 
        name="Admin" 
        component={AdminNavigator} 
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
              size={23}
              color={props.color}
            />
          )
        }} 
      />
    </DrawerNavigator.Navigator>
  );
}