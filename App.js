// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Details from './Screens/Details./Details';
import store from './store';
import {Provider} from 'react-redux';
import CombinedHomes from './Screens/CombinedHomes';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={CombinedHomes}
            options={{
              headerStyle: {backgroundColor: 'coral'},
            }}
          />
          <Stack.Screen
            name="Details"
            component={Details}
            options={{
              headerBackTitleVisible: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
