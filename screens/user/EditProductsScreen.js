import React, { useCallback, useEffect, useReducer } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Platform,
  Alert
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import * as productActions from '../../store/actions/products';
import HeaderButton from '../../components/UI/CustomHeaderButton';

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
  const prodId = props.navigation.getParam('prodId');
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

  const onInputChange = (type, text) => {
    let isValid = true;
    if(text.trim().length === 0) {
      isValid = false
    }
    dispatchFormState({
      type: FORM_UPDATE, 
      value: text, 
      isValid,
      input: type
    })
  }

  const submitHandler = useCallback(() => {
    if(!formState.formIsValid) {
      Alert.alert(
        'Wrong Input',
        'Please check errors in the form',
        [{text: 'OK'}]
      )
      return;
    }
    if(product) {
      dispatch(productActions.updateProduct(
        formState.inputValues.title, 
        formState.inputValues.imgUrl, 
        formState.inputValues.desc, 
        prodId
      ));
    } else {
      dispatch(productActions.createProduct(
        formState.inputValues.title, 
        formState.inputValues.imgUrl, 
        +formState.inputValues.price, 
        formState.inputValues.desc));
    }
    props.navigation.goBack();
  }, [dispatch, prodId, formState]);
  
  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [ submitHandler ]);
  
  return (
    <ScrollView>
      <View style={styles.form}>
        {/* Title */}
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput 
            style={styles.input} 
            value={formState.inputValues.title} 
            onChangeText={onInputChange.bind(this, 'title')}
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
          />
          {!formState.inputValidities.title && <Text>Enter a valid title</Text>}
        </View>
        {/* Image */}
        <View style={styles.formControl}>
          <Text style={styles.label}>Image url</Text>
          <TextInput 
            style={styles.input} 
            value={formState.inputValues.imgUrl} 
            onChangeText={onInputChange.bind(this, 'imgUrl')}
            keyboardType="default"
          />
        </View>
        {/* Price */}
        {product ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput 
              style={styles.input} 
              value={formState.inputValues.price} 
              onChangeText={onInputChange.bind(this, 'price')}
              keyboardType="decimal-pad"
            />
            {!formState.inputValidities.title && <Text>Enter a valid title</Text>}
          </View>
        )}
        {/* Description */}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput 
            style={styles.input} 
            value={formState.inputValues.desc} 
            onChangeText={onInputChange.bind(this, 'desc')}
            keyboardType="default"
            multiline
          />
        </View>
      </View>
    </ScrollView>
  );
}

EditProductsScreen.navigationOptions = navData => {
  const submitHandler = navData.navigation.getParam('submit');

  return {
    headerTitle: navData.navigation.getParam('prodId') ? 'Edit Product' : 'Add Product',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item 
          title='Save' 
          iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'} 
          onPress={submitHandler}
        />
      </HeaderButtons>
    )
  }
};

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  formControl: {
    width: '100%'
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  }
});

export default EditProductsScreen;