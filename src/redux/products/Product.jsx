import React, {useEffect, useLayoutEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, fetchProducts} from '../slice/Slice';
import {useNavigation} from '@react-navigation/native';
import CartIcon from './CartIcon';

const Product = () => {
  const products = useSelector(state => state.product.items);
  const cart = useSelector(state => state.product.cart);
  const isLoading = useSelector(state => state.product.isLoading);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <CartIcon />,
    });
  });

  function handleAddToCart(item) {
    if (hasItemInCart(item.id)) {
      navigation.navigate('Cart');
    } else {
      dispatch(addToCart(item));
    }
  }

  function hasItemInCart(itemId) {
    return cart.some(val => val.id === itemId);
  }

  const renderProduct = ({item}) => (
    <View style={styles.card}>
      <View style={styles.imageWrapper}>
        <Image source={{uri: item.image}} style={styles.image} />
      </View>

      <View style={styles.content}>
        <Text numberOfLines={2} style={styles.title}>
          {item.title}
        </Text>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.price}>$ {item.price}</Text>
      </View>

      <TouchableOpacity
        onPress={() => handleAddToCart(item)}
        style={styles.button}>
        <Text style={styles.buttonText}>
          {hasItemInCart(item.id) ? 'View the cart' : 'Add to Cart'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loaderWrapper}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.grid}
      />
    </View>
  );
};

export default Product;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f4f6',
    flex: 1,
    paddingTop: 20,
  },
  loaderWrapper: {
    marginTop: 50,
    alignItems: 'center',
  },
  grid: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    overflow: 'hidden',
    marginBottom: 20,
  },
  imageWrapper: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  content: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
    height: 52,
  },
  category: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4b5563',
  },
  button: {
    marginBottom: 10,
    marginHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#3b82f6',
    borderRadius: 6,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  buttonText: {
    color: '#3b82f6',
    fontWeight: '600',
  },
});
