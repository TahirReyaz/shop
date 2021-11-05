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

const ProductsMainScreen = props => {
  const availableProducts = useSelector(state => state.products.availableProducts);

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