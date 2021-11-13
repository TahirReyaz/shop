import React from 'react'
import { 
  View, 
  FlatList, 
  StyleSheet,
  Text,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import * as cartActions from '../../store/actions/cart'
import CartItem from '../../components/shop/CartItem'
import defaultStyles from '../../constants/default-styles'

const ProductsMainScreen = props => {
  const totalAmount = useSelector(state=> state.cart.totalAmount);
  const dispatch = useDispatch();
  // convert the items object into array of objects
  const cartItems = useSelector(state => { 
    const cartItemArray = [];
    for (const key in state.cart.items) {
      cartItemArray.push({
        id: key,
        title: state.cart.items[key].title,
        price: state.cart.items[key].price,
        qty: state.cart.items[key].qty,
        sum: state.cart.items[key].sum
      })
    }
    return cartItemArray.sort((a,b) => a.id > b.id ? 1 : -1);
  });

  // Return fall back text if there are no items in the cart
  if(!cartItems || cartItems.length === 0 || totalAmount === 0) {
    return (
      <View style={defaultStyles.screen}>
        <Text>No Products found. Add products to your cart.</Text>
      </View>
    )
  }

  const renderProduct = itemData => {
    return <CartItem
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
      removeFromCartHandler={() => {
        dispatch(cartActions.removeFromCart(itemData.item.id))
      }}
    />
  }

  return (
    <View>
      <Text>Total Amount: {totalAmount.toFixed(2)}</Text>
      <FlatList data={cartItems} renderItem={renderProduct} />
    </View>
  );
}

ProductsMainScreen.navigationOptions = {
  headerTitle: 'Cart',
};

const styles = StyleSheet.create({
  
});

export default ProductsMainScreen;