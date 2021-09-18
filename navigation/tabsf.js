import React from 'react'
import {
    Image
} from 'react-native';
import { Home } from "../screens/";
import { icons, COLORS } from "../constants";
import AllPosts from "../screens/AllPosts";
import AllEvents from "../screens/AllEvents";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
function tabsf() {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === "Home") {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === "AllPosts") {
              iconName = focused ? 'list' : 'list-outline';

            } else if (rn === "AllEvents") {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70}
        }}>
            <Tab.Screen
        name="Home"
        component={Home}
    />
    <Tab.Screen
        name="AllPosts"
        component={AllPosts}
    />
    <Tab.Screen
        name="AllEvents"
        component={AllEvents}
    />
      </Tab.Navigator>
    )
}

export default tabsf
