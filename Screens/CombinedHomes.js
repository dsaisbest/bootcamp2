import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home/Home';
import Favourites from './Favourites/Favourites';

const Tab = createBottomTabNavigator();

export default function CombinedHomes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontWeight: '700',
          fontSize: 20,
        },
        tabBarStyle: {
          borderTopWidth: 0,
        //   height:75
        },
        tabBarIconStyle: {display: 'none'},
      }}>
      <Tab.Screen name="List" component={Home} />
      <Tab.Screen name="Favourites" component={Favourites} />
    </Tab.Navigator>
  );
}
