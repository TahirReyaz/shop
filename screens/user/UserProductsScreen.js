import React from 'react'
import { 
  View, 
  FlatList, 
  StyleSheet,
  Text,
  Platform
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import * as cartActions from '../../store/actions/cart'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/CustomHeaderButton'
import ListItem from '../../components/shop/ListItem'
import defaultStyles from '../../constants/default-styles'

const UserProductsScreen = props => {
  const availableProducts = useSelector(state => state.products.userProducts);
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
      addToCartHandler={() => {
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

UserProductsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'User Products',
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
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item 
          title='Cart' 
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} 
          onPress={() => navData.navigation.navigate({
            routeName: 'Cart'
          })}
        />
      </HeaderButtons>
    )
  }
};

const styles = StyleSheet.create({
  
});

export default UserProductsScreen;