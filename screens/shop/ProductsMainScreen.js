import React, { useState, useEffect, useCallback } from 'react'
import { 
  View, 
  FlatList, 
  StyleSheet,
  Platform,
  Button,
  ActivityIndicator,
  Text
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import * as cartActions from '../../store/actions/cart';
import * as productActions from '../../store/actions/products';
import HeaderButton from '../../components/UI/CustomHeaderButton';
import ListItem from '../../components/shop/ListItem';
import defaultStyles from '../../constants/default-styles';
import Colors from '../../constants/Colors';

const ProductsMainScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const availableProducts = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  const loadProducts = useCallback( async () => {
    setIsRefreshing(true);
    setError(null);
    try {
      await dispatch(productActions.fetchProducts());
    } catch (err) {
      setError(err.message)
    }
    setIsRefreshing(false);
  }, [dispatch, setError]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener(
      'focus',
      loadProducts
    );
    return () => {
      unsubscribe();
    }
  }, [loadProducts]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProducts, setIsLoading]);

  const onSelectHandler = (title, id) => {
    props.navigation.navigate({
      name: 'Details', 
      params: {
        prodId: id,
        title: title,
      },
    })
  }

  if(error) {
    return (
      <View style={defaultStyles.screen}>
        <Text>An error occured. Sad Emoji.</Text>
        <Button 
          title="Try Again" 
          color={Colors.primary} 
          onPress={loadProducts} 
        />
      </View>
    )
  }

  if(isLoading) {
    return (
      <View style={defaultStyles.screen}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    )
  }

  if(!isLoading && availableProducts.length === 0) {
    return (
      <View style={defaultStyles.screen}>
        <Text>No products found. Start adding some.</Text>
      </View>
    )
  }

  const renderProduct = itemData => {
    return <ListItem listData={itemData.item} >
      <View>
        <Button 
          title="Details" 
          color={Colors.primary} 
          onPress={() => onSelectHandler(itemData.item.title, itemData.item.id)} 
        />
      </View>
      <View>
        <Button 
          title="Add To Cart" 
          color={Colors.primary} 
          onPress={() => {dispatch(cartActions.addToCart(itemData.item))}} 
        />
      </View>
    </ListItem>
  }

  return (
    <View>
      <FlatList 
        data={availableProducts} 
        renderItem={renderProduct} 
        onRefresh={loadProducts}
        refreshing={isRefreshing}
      />
    </View>
  );
}

export const screenOptions = navData => {
  return {
    headerTitle: 'All Products',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Menu'
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} 
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item 
          title='Cart' 
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} 
          onPress={() => navData.navigation.navigate('Cart')}
        />
      </HeaderButtons>
    )
  }
};

const styles = StyleSheet.create({

});

export default ProductsMainScreen;