import { View, Text } from 'react-native'
import * as React from 'react';
import styles from './Styles'

export default function Details({ route, navigation }) {
    const {Detaildata} = route.params;
    console.log('parameters from routes',Detaildata.symbol);
  return (
    <View style={styles.container}>
      <Text>price of {Detaildata.symbol} is {Detaildata.averagePrice}</Text>
    </View>
  )
}