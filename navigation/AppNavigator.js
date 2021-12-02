import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { ShopNavigator, AuthNavigator } from './Navigator';
import StartupScreen from '../screens/StartupScreen';

const Stack = createStackNavigator();

const AppNavigator = props => {
  const isAuth = useSelector(state => !!state.auth.token);
  const triedAutoLogin = useSelector(state => state.auth.triedAutoLogin);

  return (
    <NavigationContainer>
      {isAuth && <ShopNavigator />}
      {!isAuth && triedAutoLogin && <AuthNavigator />}
      {!isAuth && !triedAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
}

export default AppNavigator;