import React, 
{ 
  useCallback, 
  useEffect, 
  useState, 
  useReducer 
} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Button,
  ActivityIndicator,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';

import * as authActions from '../../store/actions/auth';
import { SIGNUP } from '../../store/actions/auth';
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import defaultStyles from '../../constants/default-styles';

const formReducer = (state, action) => {
  if(action.type === SIGNUP) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for(const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValues: updatedValues,
      inputValidities: updatedValidities
    }
  }
  return state;
}

const AuthScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer,{
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false
  });

  // If code or server error occurs while submitting
  useEffect(() => {
    if(error) {
      Alert.alert('An error occurred',error,[{text: 'Ok'}]);
    }
  }, [error]);

  const inputChangeHandler = useCallback((inputIdentifier, value, validity) => {
    dispatchFormState({
      type: SIGNUP,
      value: value,
      isValid: validity,
      input: inputIdentifier
    })
  }, [dispatchFormState]);

  const authHandler = useCallback( async () => {
    if(!formState.formIsValid) {
      Alert.alert(
        'Wrong Input',
        'Please check errors in the form',
        [{text: 'OK'}]
      )
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      if(isSignup) {
        await dispatch(authActions.signup(
          formState.inputValues.email, 
          formState.inputValues.password, 
        ));
      } else {
        await dispatch(authActions.login(
          formState.inputValues.email, 
          formState.inputValues.password, 
        ));
        // props.navigation.navigate('Shop');
      }
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }, [dispatch, formState]);

  return (
    <KeyboardAvoidingView style={styles.screen}>
      <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input 
              id="email"
              label="E-mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              error="Please enter a valid email address."
              onInputChange={inputChangeHandler}
              initialValue=""
              // initiallyValid={true}
            />
            <Input 
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              error="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
              // initiallyValid={true}
            />
            <View style={styles.button}>
              {isLoading ? (
                <ActivityIndicator size='large' color={Colors.primary} />
                ) : (
                  <Button 
                    title={isSignup ? 'Sign UP' : 'Login'}
                    color={Colors.primary} 
                    onPress={authHandler}
                  />
                )
              }
            </View>
            <View style={styles.button}>
              <Button 
                title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}
                color={Colors.secondary} 
                onPress={() => {
                  setIsSignup(prevState => !prevState);
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export const screenOptions = {
  headerTitle: "Authenticate"
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    marginTop: 10
  }
});

export default AuthScreen;