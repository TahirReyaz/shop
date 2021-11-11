import React from 'react'
import { 
  View, 
  FlatList, 
  StyleSheet,
  Text
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import * as cartActions from '../../store/actions/cart'
import ListItem from '../../components/ListItem'
import defaultStyles from '../../constants/default-styles'

const ProductsMainScreen = props => {
  const availableProducts = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  if(!availableProducts || availableProducts.length === 0) {
    return (
      <View style={defaultStyles.screen}>
        <Text>No Products found. Maybe check your filters</Text>
      </View>
    )
  }

  const renderProduct = itemData => {
    return <ListItem
      listData={itemData.item}
      showDetails={() => {
        props.navigation.navigate({
          routeName: 'Details', 
          params: {
            prodId: itemData.item.id,
            title: itemData.item.title,
          }
        })
      }}
      addTocart={() => {
        dispatch(cartActions.addToCart(itemData.item))
      }}
    />
  }

  return (
    <View>
      <FlatList data={availableProducts} renderItem={renderProduct} />
    </View>
  );
}

ProductsMainScreen.navigationOptions = {
  headerTitle: 'All Products'
};

const styles = StyleSheet.create({
  
});

export default ProductsMainScreen;