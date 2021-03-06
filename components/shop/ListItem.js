import React from 'react'
import { 
  View, 
  ImageBackground, 
  Text, 
  StyleSheet, 
  Button
} from 'react-native';
import Card from '../UI/Card';

const ListItem = props => {

  return (
    <Card style={styles.container}>
      <View style={styles.gridItem}>
        {/* Image */}
        <View style={styles.header}>
          <ImageBackground source={{uri: props.listData.imgUrl}} style={styles.bgImg}>
            <View style={styles.titleContainer}>
              <Text style={styles.title} numberOfLines={1}>{props.listData.title}</Text>
            </View>
          </ImageBackground>
        </View>
        {/* Price */}
        <View style={styles.details}>
          <Text style={{color: '#888'}}>${props.listData.price.toFixed(2)}</Text>
        </View>
        {/* Buttons */}
        <View style={styles.buttonContainer}>
          {props.children}
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    height: 200,
    borderRadius: 5,
    overflow: 'hidden',
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
    fontFamily: 'open-sans'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
});

export default ListItem;