import React from 'react'
import { 
  View, 
  FlatList, 
  StyleSheet,
  Text
} from 'react-native'
import { useSelector } from 'react-redux'
import ListItem from '../../components/ListItem'
import defaultStyles from '../../constants/default-styles'

const ProductsMainScreen = () => {
  const availableProducts = useSelector(state => state.products.availableProducts);

  if(!availableProducts || availableProducts.length === 0) {
    return (
      <View style={defaultStyles.screen}>
        <Text>No Products found. Maybe check your filters</Text>
      </View>
    )
  }

  const renderProduct = itemData => {
    return <ListItem listData={itemData.item} />
  }

  return (
    <View>
      <FlatList data={availableProducts} renderItem={renderProduct} />
    </View>
  );
}

const styles = StyleSheet.create({
  
});

export default ProductsMainScreen;