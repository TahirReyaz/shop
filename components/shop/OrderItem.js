import React, { useState } from 'react';
import { 
  View, 
  StyleSheet,
  Button,
  Text
} from 'react-native';
import CartItem from './CartItem';
import Colors from '../../constants/Colors';

const OrderItem = props => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.summary}>
        <Text style={styles.amount}>${props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button 
        title={showDetails ? 'Hide Details' : 'Show Details'}
        color={Colors.primary} 
        onPress={() => {
          setShowDetails(prevState => !prevState);
        }} 
      />
      {showDetails && <View style={styles.detailItems}>
        {props.items.map(item => (
          <CartItem key={item.id} listData={item} />
        ))}
      </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 10,
    borderRadius: 5,
    overflow: 'hidden',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15
  },
  amount: {
    fontFamily: 'open-sans-bold',
    fontSize: 16
  },
  date: {
    fontFamily: 'open-sans',
    fontSize: 16,
    color: '#888'
  },
  detailItems: {
    width: '100%'
  }
});

export default OrderItem;