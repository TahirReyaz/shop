import React, { useEffect, useCallback } from 'react'
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  Image,
  Button
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Colors from '../../constants/Colors';

const DetailScreen = props => {
  const prodId = props.navigation.getParam('prodId');
  const availableprods = useSelector(state => state.products.availableProducts)
  const prod = availableprods.find(prod => prod.id === prodId);

  if(!prod) {
    return (
      <Text>Error 404. Not Found</Text>
    )
  }

  return (
    <ScrollView>
      <View>
        <Image source={{uri: prod.imgUrl}} style={styles.img} />
      </View>
      <View style={styles.details}>
        <View style={styles.button}>
          <Button 
            title="Add To Cart" 
            color={Colors.primary} 
            onPress={props.addToCart} 
          />
        </View>
        <Text style={styles.price}>${prod.price}</Text>
        <Text style={styles.desc}>{prod.desc}</Text>
      </View>
    </ScrollView>
  );
}

DetailScreen.navigationOptions = navData => {
  const prodTitle = navData.navigation.getParam('title');

  return {
    headerTitle: prodTitle,
  }
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'open-sans-bold'
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