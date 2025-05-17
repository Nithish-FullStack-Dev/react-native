import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {removeFromCart} from '../slice/Slice';

const Cart = () => {
  const cart = useSelector(state => state.product.cart);
  const dispatch = useDispatch();

  function handleRemoveItem(id) {
    dispatch(removeFromCart(id));
  }

  const renderProduct = ({item}) => (
    <View style={styles.cartItem}>
      <Image source={{uri: item.image}} style={styles.image} />

      <View style={styles.details}>
        <Text numberOfLines={2} style={styles.title}>
          {item.title}
        </Text>
        <Text style={styles.price}>$ {item.price}</Text>
        <Text style={styles.category}>{item.category}</Text>
      </View>

      <TouchableOpacity onPress={() => handleRemoveItem(item.id)}>
        <Icon name="delete" size={24} color="#ff5252" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <Text style={styles.empty}>Your cart is empty.</Text>
      ) : (
        <FlatList
          data={cart}
          renderItem={renderProduct}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 3,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  details: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 4,
  },
  category: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  empty: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
  },
});
