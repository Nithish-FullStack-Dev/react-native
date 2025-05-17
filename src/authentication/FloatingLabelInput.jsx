import React, {useState, useEffect, useRef} from 'react';
import {View, TextInput, StyleSheet, Animated} from 'react-native';

const FloatingLabelInput = ({
  label,
  value,
  onChangeText,
  keyboardType = 'default',
  isDarkMode,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedIsFocused = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || value ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelStyle = {
    position: 'absolute',
    left: 12,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [14, -10],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: isDarkMode ? '#aaa' : '#555',
    backgroundColor: isDarkMode ? '#2c2c2c' : '#f9f9f9',
    paddingHorizontal: 4,
  };

  return (
    <View
      style={[
        styles.inputContainer,
        {borderColor: isDarkMode ? '#aaa' : '#ccc'},
      ]}>
      <Animated.Text style={labelStyle}>{label}</Animated.Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        style={[styles.input, {color: isDarkMode ? '#fff' : '#000'}]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

export default FloatingLabelInput;

const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 20,
    paddingHorizontal: 12,
    paddingTop: 18,
    paddingBottom: 8,
  },
  input: {
    fontSize: 16,
    padding: 0,
  },
});
