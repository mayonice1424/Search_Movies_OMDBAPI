import React from "react";
import Movies from "../screens/Movies";
import Details from "../screens/Details";
import Search from "../screens/Search";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    // <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
        name="Movies"
        component={Movies}
        />
        <Stack.Screen
        name="Search"
        component={Search}
        />
        <Stack.Screen
        name="Details"
        component={Details}
        />
      </Stack.Navigator>
    // </NavigationContainer>
    
  );
};
export default AppNavigation;
