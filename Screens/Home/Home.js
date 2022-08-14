import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import * as React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styles from './Styles';
import {resetData, getData} from '../../reducers/counter';
import Info from './Info';

export default function Home({navigation}) {
  const apiData = useSelector(state => state.counter.apiData);
  const loading = useSelector(state => state.counter.loading);
  const pageNo = useSelector(state => state.counter.page);
  const dispatch = useDispatch();
  const link = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=12&page=${pageNo}&sparkline=false`;
  const link2 = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=12&page=1&sparkline=false`;
  React.useEffect(() => {
    dispatch(getData(link));
  }, []);
  const [search, setSearch] = React.useState('');
  const renderingData = apiData.filter(element =>
    element.name.toLowerCase().startsWith(search.toLowerCase()),
  );
  console.log(renderingData,'getting data');
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textinput}
        placeholder="Search"
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={renderingData}
        onEndReached={() => {
          dispatch(getData(link));
        }}
        onEndReachedThreshold={0}
        refreshing={false}
        onRefresh={() => {
          dispatch(resetData(link2));
        }}
        renderItem={({item}) => (
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
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item, id) => id}
      />

      {loading ? (
        <ActivityIndicator size="large" color="coral" />
      ) : (
        <Text></Text>
      )}
    </View>
  );
}
