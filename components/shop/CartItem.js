import React from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  Button
} from 'react-native';
import Colors from '../../constants/Colors';

const CartItem = props => {

  return (
    <View style={styles.container}>
      <View style={styles.gridItem}>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {props.listData.title}
          </Text>
        </View>
        {/* Details */}
        <View style={styles.details}>
          <Text style={{color: '#888'}}>
            ${props.listData.price.toFixed(2)}
          </Text>
          <Text>{props.listData.qty}</Text>
          <Text>{props.listData.sum}</Text>
        </View>
        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button 
              title="Details" 
              color={Colors.primary} 
              onPress={props.showDetails} 
            />
          </View>
          {props.deletable && (<View style={styles.button}>
            <Button 
              title="Delete" 
              color={Colors.primary} 
              onPress={props.removeFromCartHandler} 
            />
          </View>
          )}        
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    overflow: 'hidden',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 3,
    paddingBottom: 5
  },
  gridItem: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
  },
  titleContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'open-sans-bold',
    fontSize: 18
  },
  bgImg: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end'
  },
  header: {
    height: '60%'
  },
  details: {
    height: '15%',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    fontFamily: 'open-sans',
    flexDirection: 'row',
    marginVertical: 15
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  // button: {
  //   width: '30%'
  // }
});

export default CartItem;