import { View, Text } from 'react-native'
import  React from 'react';
import Lines from './Lines';
import { getDetails } from '../../reducers/details';
export default function Details({ route, navigation }) {
    

  return (
    <View>
    <Lines id={route.params.id}/>
    </View>
  )
}