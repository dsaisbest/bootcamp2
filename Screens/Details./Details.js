import {View, Text, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import Lines from './Lines';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { seedFavourite } from '../../reducers/counter';

export default function Details({route, navigation}) {
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('favourites');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
  
  }, []);

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Text
        style={{
          backgroundColor: 'white',
          fontSize: 19,
          fontWeight: '700',
          textAlign: 'center',
        }}>
        {route.params.name}
      </Text>
        
        <Lines id={route.params.id} change={route.params.change} />
       
      
    </View>
  );
}
