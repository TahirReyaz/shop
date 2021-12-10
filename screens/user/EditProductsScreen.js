import React, { useState, useCallback, useEffect, useReducer } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import * as productActions from '../../store/actions/products';
import HeaderButton from '../../components/UI/CustomHeaderButton';
import Input from '../../components/UI/Input';
import defaultStyles from '../../constants/default-styles';
import Colors from '../../constants/Colors';

const FORM_UPDATE = 'UPDATE';

const formReducer = (state, action) => {
  if(action.type === FORM_UPDATE) {
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

const EditProductsScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const prodId = props.route.params 
    ? props.route.params.prodId
    : null;
  const product = useSelector(state => 
    state.products.userProducts.find(prod => prod.id === prodId)
  );

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer,{
    inputValues: {
      title: product ? product.title : '',
      imgUrl: product ? product.imgUrl : '',
      desc: product ? product.desc : '',
      price: ''
    },
    inputValidities: {
      title: product ? true : false,
      imgUrl: product ? true : false,
      desc: product ? true : false,
      price: product ? true : false,
    },
    formIsValid: product ? true : false
  });

  useEffect(() => {
    if(error) {
      Alert.alert('An error occurred',error,[{text: 'Ok'}]);
    }
  }, [error]);

  const inputChangeHandler = useCallback((inputIdentifier, value, validity) => {
    dispatchFormState({
      type: FORM_UPDATE,
      value: value,
      isValid: validity,
      input: inputIdentifier
    })
  }, [dispatchFormState]);


  const submitHandler = useCallback( async () => {
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
      if(product) {
        await dispatch(productActions.updateProduct(
          formState.inputValues.title, 
          formState.inputValues.imgUrl, 
          formState.inputValues.desc, 
          prodId
        ));
      } else {
        await dispatch(productActions.createProduct(
          formState.inputValues.title, 
          formState.inputValues.imgUrl, 
          +formState.inputValues.price, 
          formState.inputValues.desc));
      }
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, prodId, formState]);
  
  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item 
            title='Save' 
            iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'} 
            onPress={submitHandler}
          />
        </HeaderButtons>
      )
    });
  }, [ submitHandler ]);

  if(isLoading) {
    return (
      <View style={defaultStyles.screen}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    )
  }
  
  return (
    <KeyboardAvoidingView 
      style={{flex: 1}}
      behavior="padding"
    >
      <ScrollView>
        <View style={styles.form}>
          {/* Title */}
          <Input 
            id="title"
            label="Title"
            keyboardType="default"
            error="Please enter a valid title!"
            autoCapitalize="sentences"
            autoCorrect
            returnType="next"
            onInputChange={inputChangeHandler}
            initialValue={product ? product.title : ''}
            initiallyValid={!!product}
            required
          />
          {/* Image */}
          <Input 
            id="imgUrl"
            label="Image URL"
            keyboardType="default"
            error="Please enter a valid image url!"
            autoCapitalize="sentences"
            autoCorrect
            returnType="next"
            onInputChange={inputChangeHandler}
            initialValue={product ? product.imgUrl : ''}
            initiallyValid={!!product}
            required
          />
          {/* Price */}
          {product ? null : (
          <Input 
            id="price"
            label="Price"
            keyboardType="decimal-pad"
            error="Please enter a valid price!"
            returnType="next"
            onInputChange={inputChangeHandler}
            initialValue={product ? product.price : ''}
            initiallyValid={!!product}
            required
            min={0.1}
          />)}
          {/* Description */}
          <Input 
            id="desc"
            label="Description"
            keyboardType="default"
            error="Please enter a valid description!"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            returnType="next"
            onInputChange={inputChangeHandler}
            initialValue={product ? product.desc : ''}
            initiallyValid={!!product}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export const screenOptions = navData => {
  const routeParams = navData.route.params
    ? navData.route.params
    : {};

  return {
    headerTitle: routeParams.prodId 
      ? 'Edit Product' 
      : 'Add Product'
  }
};

const styles = StyleSheet.create({
  form: {
    margin: 20
  }
});

export default EditProductsScreen;