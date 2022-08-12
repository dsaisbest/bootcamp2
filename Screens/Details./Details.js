import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import Lines from './Lines';
export default function Details({route, navigation}) {
  console.log('coming from details',route.params);

  return (
    <View>
      <Text
        style={{
          backgroundColor: 'white',
          fontSize: 19,
          fontWeight: '700',
          textAlign: 'center',
        }}>
        {route.params.name}
      </Text>
      <View style={{flex:1,justifyContent:'flex-end',alignItems:'flex-start'}}>
      <Lines id={route.params.id} change={route.params.change}/>
      </View>
    </View>
  );
}
