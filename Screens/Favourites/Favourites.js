import {View, FlatList, TouchableOpacity, TextInput} from 'react-native';
import * as React from 'react';
import {useSelector} from 'react-redux';
import styles from '../Home/Styles';
import Info from '../Home/Info';

export default function Favourites({navigation}) {
  let renderingData = useSelector(state => state.counter.favourites);
  const [search, setSearch] = React.useState('');
  searchData = renderingData.filter(element =>
    element.name.toLowerCase().startsWith(search.toLowerCase()),
  );

  console.log(renderingData, 'getting data');
  return (
    <View style={styles.container}>
    <TextInput
        style={styles.textinput}
        placeholder="Search"
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={searchData}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Details', {
                  id: item.id,
                  name: item.name,
                  change: item.percentageChange,
                });
              }}>
              <Info
                symbol={item.symbol}
                averagePrice={item.averagePrice}
                image={item.image}
                name={item.name}
                percentageChange={item.percentageChange}
                index={item.index}
                favourite={item.favourite}
              />
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, id) => id}
      />
    </View>
  );
}
