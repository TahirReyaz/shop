import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/CustomHeaderButton'

import * as orderActions from '../../store/actions/orders';
import defaultStyles from '../../constants/default-styles';
import Colors from '../../constants/Colors';
import OrderItem from '../../components/shop/OrderItem';

const OrdersScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const orders = useSelector(state => state.orders.orders);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(orderActions.fetchOrders()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  if(isLoading) {
    return (
      <View style={defaultStyles.screen}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    )
  }

  if(!orders || orders.length === 0) {
    return (
      <View style={defaultStyles.screen}>
        <Text>No Orders found. Order something!</Text>
      </View>
    )
  }

  const renderOrder = itemData => {
    return (
      <OrderItem
        amount={itemData.item.totalAmount}
        date={itemData.item.readableDate}
        items={itemData.item.items}
      />
    )
  }

  return (
    <View>
      <FlatList data={orders} renderItem={itemData => renderOrder(itemData)} />
    </View>
  );
}

OrdersScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Your Orders',
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
    )
  }
};

const styles = StyleSheet.create({
  
});

export default OrdersScreen;