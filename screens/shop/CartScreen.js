import React from 'react'
import { 
  View, 
  FlatList, 
  StyleSheet,
  Text,
} from 'react-native'
import { useSelector } from 'react-redux'
// import * as cartActions from '../../store/actions/cart'
// import defaultStyles from '../../constants/default-styles'

const ProductsMainScreen = props => {
  const totalAmount = useSelector(state=> state.cart.totalAmount);
  const cartItems = useSelector(state => state.cart.items);
  // const dispatch = useDispatch();

  if(!cartItems || cartItems.length === 0 || totalAmount === 0) {
    return (
      <View style={defaultStyles.screen}>
        <Text>No Products found. Add products to your cart.</Text>
      </View>
    )
  }

  // const renderProduct = itemData => {
  //   return <ListItem
  //     listData={itemData.item}
  //     showDetails={() => {
  //       props.navigation.navigate({
  //         routeName: 'Details', 
  //         params: {
  //           prodId: itemData.item.id,
  //           title: itemData.item.title,
  //         }
  //       })
  //     }}
  //     addTocart={() => {
  //       dispatch(cartActions.addToCart(itemData.item))
  //     }}
  //   />
  // }

  return (
    <View>
      <Text>Total Amount: {totalAmount.toFixed(2)}</Text>
    </View>
  );
}

ProductsMainScreen.navigationOptions = {
  headerTitle: 'Cart',
};

const styles = StyleSheet.create({
  
});

export default ProductsMainScreen;