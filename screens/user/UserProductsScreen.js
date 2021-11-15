import React from 'react'
import { 
  View, 
  FlatList, 
  StyleSheet,
  Text,
  Platform,
  Button
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import * as productActions from '../../store/actions/products'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/CustomHeaderButton'
import ListItem from '../../components/shop/ListItem'
import defaultStyles from '../../constants/default-styles'
import Colors from '../../constants/Colors';

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
    return <ListItem listData={itemData.item} >
      <View>
        <Button 
          title="Edit" 
          color={Colors.primary} 
          // onPress={() => onSelectHandler(itemData.item.title, itemData.item.id)} 
        />
      </View>
      <View>
        <Button 
          title="Delete" 
          color={Colors.primary} 
          onPress={() => {
            dispatch(productActions.delProduct(itemData.item.id))
          }} 
        />
      </View>
    </ListItem>
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