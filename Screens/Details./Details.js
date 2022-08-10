import { View, Text } from 'react-native'
import * as React from 'react';
import styles from './Styles'

export default function Details({ route, navigation }) {
    const data = route.params;
    console.log(data);
  return (
    <View style={styles.container}>
      <Text>Details +{data.data}</Text>
    </View>
  )
}