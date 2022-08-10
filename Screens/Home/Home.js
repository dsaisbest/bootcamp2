import {View, Text, Button, FlatList, StyleSheet} from 'react-native';
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
    dispatch(getData());
  }, []);

  return (
    <View style={styles.container}>
      {apiData ? (
        <FlatList
          data={apiData}
          renderItem={(item, ind) => (
            <Info
              symbol={item.item.symbol}
              averagePrice={item.item.averagePrice}
            />
          )}
          keyExtractor={(item, id) => id}
        />
      ) : (
        <Text>....pending</Text>
      )}
    </View>
  );
}
