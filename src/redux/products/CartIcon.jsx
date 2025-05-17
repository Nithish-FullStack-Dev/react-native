import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const CartIcon = () => {
  const navigation = useNavigation();
  const cart = useSelector(state => state.product.cart);

  return (
    <View style={{marginRight: 15}}>
      <Icon
        name="shopping-cart"
        size={30}
        color="#4F8EF7"
        onPress={() => navigation.navigate('Cart')}
      />
      {cart.length > 0 && (
        <View
          style={{
            position: 'absolute',
            right: -6,
            top: -4,
            backgroundColor: 'red',
            borderRadius: 10,
            width: 18,
            height: 18,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 10, fontWeight: 'bold'}}>
            {cart.length}
          </Text>
        </View>
      )}
    </View>
  );
};

export default CartIcon;
