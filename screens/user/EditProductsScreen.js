import React, { useCallback, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Platform
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import * as productActions from '../../store/actions/products';
import HeaderButton from '../../components/UI/CustomHeaderButton';

const EditProductsScreen = props => {
  const prodId = props.navigation.getParam('prodId');
  const product = useSelector(state => 
    state.products.userProducts.find(prod => prod.id === prodId)
  );

  const dispatch = useDispatch();

  const [title, setTitle] = useState(product ? product.title : "");
  const [imgUrl, setImgUrl] = useState(product ? product.imgUrl : "");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(product ? product.desc : "");

  const submitHandler = useCallback(() => {
    if(product) {
      dispatch(productActions.updateProduct(title, imgUrl, description, prodId));
    } else {
      dispatch(productActions.createProduct(title, imgUrl, +price, description));
    }
    props.navigation.goBack();
  }, [dispatch, title, imgUrl, description, prodId, price]);
  
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
            value={title} 
            onChangeText={txt => setTitle(txt)}
          />
        </View>
        {/* Image */}
        <View style={styles.formControl}>
          <Text style={styles.label}>Image url</Text>
          <TextInput 
            style={styles.input} 
            value={imgUrl} 
            onChangeText={txt => setImgUrl(txt)}
          />
        </View>
        {/* Price */}
        {product ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput 
              style={styles.input} 
              value={price} 
              onChangeText={txt => setPrice(txt)}
            />
          </View>
        )}
        {/* Description */}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput 
            style={styles.input} 
            value={description} 
            onChangeText={txt => setDescription(txt)}
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