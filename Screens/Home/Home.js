import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import * as React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styles from './Styles';
import {resetData, getData} from '../../reducers/counter';
function Info(props) {
  return (
    <View style={styles.items}>
      <View style={styles['sub-itmes']}>
        <Image source={{uri: props.image}} style={styles.logo} />
        <Text style={{fontWeight: '700', fontSize: 15, textAlign: 'center'}}>
          {props.name}
        </Text>
        <Text style={{fontStyle: 'italic', color: 'grey'}}>{props.symbol}</Text>
      </View>
      <View style={styles.price}>
        <Text style={{fontWeight: '800', fontSize: 16}}>
          {'\u0024'}
          {props.averagePrice.toLocaleString()}
        </Text>
        <Text style={{fontWeight: '600', fontSize: 12}}>
          {props.percentageChange > 0 ? (
            <Text style={{color: 'green'}}>▲</Text>
          ) : (
            <Text style={{color: 'red'}}>▼</Text>
          )}{' '}
          {props.percentageChange.toFixed(3)}
          <Text style={{fontSize: 10, fontWeight: '900'}}>%</Text>
        </Text>
      </View>
    </View>
  );
}
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

  return (
    <View style={styles.container}>
      <FlatList
        data={apiData}
        onEndReached={() => {
          dispatch(getData(link));
        }}
        onEndReachedThreshold={0}
        refreshing={loading}
        onRefresh={() => {
          dispatch(resetData(link2));
        }}
        scrollsToTop={false}
        renderItem={({item}, ind) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Details', {id: item.id, name: item.name,change:item.percentageChange});
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
