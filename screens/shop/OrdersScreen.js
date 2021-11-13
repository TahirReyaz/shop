import React from 'react';
import { 
  View, 
  StyleSheet,
  FlatList,
  Text
} from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/CustomHeaderButton'
import defaultStyles from '../../constants/default-styles';

const OrdersScreen = () => {
  const orders = useSelector(state => state.orders.orders);
  console.log(orders);

  if(!orders || orders.length === 0) {
    return (
      <View style={defaultStyles.screen}>
        <Text>No Products found. Maybe check your filters</Text>
      </View>
    )
  }

  const renderOrder = itemData => {
    return (
      <View>
        <Text>{itemData.item.totalAmount}</Text>
      </View>
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