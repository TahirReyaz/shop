import React from 'react';
import { 
  View, 
  FlatList, 
  StyleSheet,
  Button,
  Text,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from '../../store/actions/cart';
import * as orderActions from '../../store/actions/orders';
import CartItem from '../../components/shop/CartItem';
import defaultStyles from '../../constants/default-styles';
import Colors from '../../constants/Colors';

const ProductsMainScreen = props => {
  const totalAmount = useSelector(state=> state.cart.totalAmount);
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
  const dispatch = useDispatch();

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
    <View style={defaultStyles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>${totalAmount.toFixed(2)}</Text>
        </Text>
        <Button 
          title="Order Now" 
          color={Colors.secondary} 
          onPress={() => {
            dispatch(orderActions.addOrder(cartItems, totalAmount))
          }} 
          disabled={cartItems.length === 0}
        />
      </View>
      <FlatList data={cartItems} renderItem={renderProduct} />
    </View>
  );
}

ProductsMainScreen.navigationOptions = {
  headerTitle: 'Cart',
};

const styles = StyleSheet.create({
  summary: {
    
  },
  summaryText: {

  },
  amount: {
    
  }
});

export default ProductsMainScreen;