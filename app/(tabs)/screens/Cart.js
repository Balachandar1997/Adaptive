import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import paneer from '../../../assets/images/paneer.jpg'

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const items = [
    { id: '1', name: 'Butter Chicken', price: 7 },
    { id: '2', name: 'Mutton Briyani', price: 7 },
    { id: '3', name: 'Kadai Paneer', price: 8 },
  ];

  const cartItems = items.filter((item) => cart[item.id]);
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * cart[item.id], 0);

  const handleAddToCart = (itemId) => {
    dispatch({ type: 'ADD_TO_CART', payload: { itemId } });
  };

  const handleRemoveFromCart = (itemId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { itemId } });
  };

  const renderItem = ({ item }) => {
    const itemCount = cart[item.id];
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>€{item.price}</Text>
        <View style={styles.counterContainer}>
          <TouchableOpacity onPress={() => handleRemoveFromCart(item.id)} style={styles.counterButton}>
            <Text>-</Text>
          </TouchableOpacity>
          <Text>{itemCount}</Text>
          <TouchableOpacity onPress={() => handleAddToCart(item.id)} style={styles.counterButton}>
            <Text>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
    
      <View >
        
         <TouchableOpacity
                  style={styles.cartButton}
                  onPress={() => navigation.navigate('Home')}
                >
                  <Text style={styles.cartButtonText}>
                   Back to Home Screen
                  </Text>
                </TouchableOpacity>
      </View>
      <ImageBackground
        style={styles.totalContainer}
        source={paneer} 
      >
        <Text style={styles.totalAmount}>Total: €{totalAmount.toFixed(2)}</Text>
      </ImageBackground>

      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <TouchableOpacity style={styles.backButton} onPress={() => {}}>
        <Text style={styles.backButtonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  totalContainer: {
    height: 300,
    width: '95%',
    justifyContent: 'center',
    alignSelf:'center',
    alignItems: 'center',
    margin: 8, 
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  cartButton: {
    backgroundColor: 'black',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,

  },
  cartButtonText: {
    color: 'white',
    fontSize: 14,
    alignSelf:'center',
    fontWeight: 'bold',
  },
  itemName: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 14,
    color: 'gray',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    marginHorizontal: 8,
  },
  backButton: {
    padding: 16,
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center',
    margin: 16,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
