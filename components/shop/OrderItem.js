import React, { useState } from 'react';
import { 
  View, 
  StyleSheet,
  Button,
  Text
} from 'react-native';
import CartItem from './CartItem';
import Colors from '../../constants/Colors';
import Card from '../UI/Card';

const OrderItem = props => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card style={styles.container}>
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
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 10,
    overflow: 'hidden',
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