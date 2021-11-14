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
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${totalAmount.toFixed(2)}</Text>
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
  screen: {
    margin: 20
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 20,
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 3
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18
  },
  amount: {
    color: Colors.primary
  }
});

export default ProductsMainScreen;