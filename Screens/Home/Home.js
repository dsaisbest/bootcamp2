import {View, Text, Button, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import * as React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styles from './Styles';
import {getData} from '../../reducers/counter';
function Info(props) {
  return (
    <View style={styles.items}>
      <View>
        <Text style={{fontWeight: '400', fontSize: 18}}>{props.symbol}</Text>
      </View>
      <View>
        <Text style={{fontWeight: '400', fontSize: 18}}>
          {props.averagePrice}
        </Text>
      </View>
    </View>
  );
}
export default function Home({navigation}) {
  const apiData = useSelector(state => state.counter.apiData);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getData('https://api2.binance.com/api/v3/ticker/24hr'));
  }, []);

  return (
    <View style={styles.container}>
      {apiData ? (
        <FlatList
          data={apiData}
          renderItem={(item, ind) => (
            <TouchableOpacity onPress={()=>{navigation.navigate('Details',
            {Detaildata:item.item})}}>
            <Info
              symbol={item.item.symbol}
              averagePrice={item.item.averagePrice}
            />
            </TouchableOpacity>
          )}
          keyExtractor={(item, id) => id}
        />
      ) : (
        <Text>....pending</Text>
      )}
    </View>
  );
}
