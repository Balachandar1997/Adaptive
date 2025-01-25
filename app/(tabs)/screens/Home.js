
// screens/MainScreen.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import briyani from '../../../assets/images/briyani.jpg'

const items = [
    { id: '1', name: 'Chicken Biryani', price: 7 },
    { id: '2', name: 'Mutton Biryani', price: 7 },
    { id: '3', name: 'Kadai Paneer', price: 8 },
    { id: '4', name: 'Chicken Noodles', price: 9 },
    { id: '5', name: 'Chicken rice', price: 10 },
    { id: '6', name: 'Chicken Chilly', price: 12 },
  ];
  

export default function Home() {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigation = useNavigation();
  
    
    const totalItems = Object.values(cart).reduce((sum, count) => sum + count, 0);
  
    const handleAddToCart = (itemId) => {
      dispatch({ type: 'ADD_TO_CART', payload: { itemId } });
    };
  
    const handleRemoveFromCart = (itemId) => {
      dispatch({ type: 'REMOVE_FROM_CART', payload: { itemId } });
    };
  
    const renderItem = ({ item }) => {
      const itemCount = cart[item.id] || 0;
      return (
        <View style={styles.itemContainer}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>€{item.price}</Text>
          {itemCount > 0 ? (
            <View style={styles.counterContainer}>
              <TouchableOpacity onPress={() => handleRemoveFromCart(item.id)} style={styles.counterButton}>
                <Text>-</Text>
              </TouchableOpacity>
              <Text>{itemCount}</Text>
              <TouchableOpacity onPress={() => handleAddToCart(item.id)} style={styles.counterButton}>
                <Text>+</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Button title="Add" onPress={() => handleAddToCart(item.id)} color="#dfe300" />
          )}
        </View>
      );
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image 
            style={styles.image}
            source={briyani}
          />
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Inka Restaurant</Text>
            <Text style={styles.cardAddress}>Tiruppur - 641 668</Text>
            <Text style={styles.cardContact}>Reach us @ 8124870201</Text>
            <TouchableOpacity style={styles.cardButton}>
              <Text style={styles.cardButtonText}>Book a Table</Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart')}
        >
          <Text style={styles.cartButtonText}>
            View Cart {totalItems > 0 ? `(${totalItems})` : ''}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
    },
    imageContainer: {
      position: 'relative',
      marginBottom: 100, 
    },
    image: {
      width: '100%',
      height: 200,
    },
    card: {
      position: 'absolute',
      top: '70%', 
      left: '10%',
      width: '80%',
      backgroundColor: 'white',
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    cardAddress: {
      fontSize: 14,
      color: 'gray',
      textAlign: 'center',
    },
    cardContact: {
      fontSize: 14,
      marginTop: 8,
      marginBottom: 16,
    },
    cardButton: {
      backgroundColor: 'black',
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    cardButtonText: {
      color: 'white',
      fontSize: 14,
      fontWeight: 'bold',
    },
    itemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 16,
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
    cartButton: {
      padding: 16,
      backgroundColor: '#445271',
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 16,
    },
    cartButtonText: {
      color: 'white',
      fontSize: 16,
    },
  });
  

