import React, { useState } from 'react';
import { 
  View, 
  FlatList, 
  StyleSheet,
  Button,
  Text,
  ActivityIndicator
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from '../../store/actions/cart';
import * as orderActions from '../../store/actions/orders';
import CartItem from '../../components/shop/CartItem';
import Colors from '../../constants/Colors';
import Card from '../../components/UI/Card';

const CartScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();

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

  const sendOrderHandler = async () => {
    setIsLoading(true);
    // setError(null);
    await dispatch(orderActions.addOrder(cartItems, totalAmount));
    setIsLoading(false);
  }

  const renderProduct = itemData => {
    return <CartItem
      listData={itemData.item}
      deletable
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
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${totalAmount.toFixed(2)}</Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size='large' color={Colors.primary} />
        ) : (
          <Button 
            title="Order Now" 
            color={Colors.secondary} 
            onPress={sendOrderHandler} 
            disabled={cartItems.length === 0}
          />
        )}
      </Card>
      <FlatList data={cartItems} renderItem={renderProduct} />
    </View>
  );
}

export const screenOptions = {
  headerTitle: 'Cart',
};

const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18
  },
  amount: {
    color: Colors.primary
  }
});

export default CartScreen;