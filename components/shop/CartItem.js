import React from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  Platform
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const CartItem = props => {
  return (
    <View style={styles.container}>
      <View style={styles.itemData}>
        <Text style={styles.qty}>{props.listData.qty} </Text>
        <Text style={styles.mainText}>{props.listData.title}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>
          ${props.listData.sum.toFixed(2)}
        </Text>
        <TouchableOpacity onPress={props.removeFromCartHandler} style={styles.del}>
          <Ionicons
            name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
            size={23}
            color='red'
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  qty: {
    fontFamily: 'open-sans',
    fontSize: 16,
    color: '#888'
  },
  mainText: {
    fontFamily: 'open-sans-bold',
    fontSize: 16
  },
  del: {
    marginLeft: 20
  }
});

export default CartItem;