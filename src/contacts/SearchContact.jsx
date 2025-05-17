import {useState} from 'react';
import {TextInput, View, FlatList, Text, StyleSheet} from 'react-native';

const SearchContact = () => {
  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search Contact"
        style={styles.searchinput}
      />

      <FlatList
        data={[]}
        renderItem={({item}) => <Text>{item.name}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default SearchContact;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  searchinput: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    margin: 10,
    borderRadius: 8,
  },
});
