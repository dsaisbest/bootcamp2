import {Text, ScrollView} from 'react-native';
import React from 'react';
import Lines from './Lines';
export default function Details({route, navigation}) {
  console.log('coming from details', route.params);

  return (
    <ScrollView>
      <Text
        style={{
          backgroundColor: 'white',
          fontSize: 22,
          fontWeight: '200',
          textAlign: 'center',
        }}>
        {route.params.name}
      </Text>
      <Lines id={route.params.id} change={route.params.change} />
    </ScrollView>
  );
}
