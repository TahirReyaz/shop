import React, { useEffect, useCallback } from 'react'
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  Image,
  Button
} from 'react-native'
// import { HeaderButtons, Item } from 'react-navigation-header-buttons'
// import CustomHeaderButton from '../components/CustomHeaderButton'
import { useSelector, useDispatch } from 'react-redux'
// import { toggleFavorite } from '../store/actions/prods'
import defaultStyles from '../../constants/default-styles'
import Colors from '../../constants/Colors';

const DetailScreen = props => {
  const prodId = props.navigation.getParam('prodId');
  const availableprods = useSelector(state => state.products.availableProducts)
  // const currentprodIsFav = useSelector(state => 
  //   state.prods.favprods.some(prod => prod.id === prodId)
  // );
  const prod = availableprods.find(prod => prod.id === prodId);

  // const dispatch = useDispatch();

  // const toggleFavoriteHandler = useCallback(() => {
  //   dispatch(toggleFavorite(prodId));
  // }, [dispatch, prodId]);

  // useEffect(() => {
  //   props.navigation.setParams({toggleFav: toggleFavoriteHandler})
  // }, [toggleFavoriteHandler])

  // useEffect(() => {
  //   props.navigation.setParams({isFav: currentprodIsFav})
  // }, [currentprodIsFav])

  return (
    <ScrollView>
      <View>
        <Image source={{uri: prod.imgUrl}} style={styles.img} />
      </View>
      <View style={styles.details}>
        <View style={styles.button}>
          <Button title="Add To Cart" color={Colors.primary} onPress={props.addToCart} />
        </View>
        <Text style={styles.price}>${prod.price}</Text>
        <Text style={styles.desc}>{prod.desc}</Text>
      </View>
    </ScrollView>
  );
}

DetailScreen.navigationOptions = navData => {
  const prodTitle = navData.navigation.getParam('title');
  // const toggleFavorite = navData.navigation.getParam('toggleFav');
  // const isFav = navData.navigation.getParam('isFav');

  return {
    headerTitle: prodTitle,
    // headerRight: () => (
    //   <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
    //     <Item title='Fav' iconName={isFav ? 'ios-star' : 'ios-star-outline'} onPress={toggleFavorite}/>
    //   </HeaderButtons>
    // )
  }
}

const styles = StyleSheet.create({
  heading: {
    // fontFamily: 'open-sans-bold'
  },
  img: {
    height: 300,
    width: '100%'
  },
  details: {
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 10
  },
  price: {
    color: '#888',
    margin: 10,
    fontSize: 18,
    fontFamily: 'open-sans-bold',
  },
  desc: {
    marginHorizontal: 10,
    fontFamily: 'open-sans',
    fontSize: 18
  },
  button: {
    width: '30%'
  }
})

export default DetailScreen;