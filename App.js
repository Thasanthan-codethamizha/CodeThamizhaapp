import React from 'react';
import { createStackNavigator, CardStyleInterpolators} from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import { BookDetail,EventDetail } from "./screens/";
import Tabs from "./navigation/tabs";
import { useFonts } from 'expo-font';
import {StatusBar} from 'react-native';
import Home from './screens/Home';
import tabsf from './navigation/tabsf';
const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        border: "transparent"
    }
}

const Stack = createStackNavigator();

const App = () => {
    const [loaded] = useFonts({
            "Montserrat-Black" : require('./assets/fonts/Montserrat-Black.ttf'),
            "Montserrat-Bold" : require('./assets/fonts/Montserrat-Bold.ttf'),
            "Montserrat-Regular" : require('./assets/fonts/Montserrat-Regular.ttf'),
        })

    if(!loaded){
        return null;
    }
    return (
        <NavigationContainer theme={theme}>
         <StatusBar backgroundColor="#1e1b26" barStyle="light-content" />
        
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                }}
                initialRouteName={'Home'}
            >
                {/* Tabs */}
                <Stack.Screen name="Home" component={Tabs} />

                {/* Screens */}
                <Stack.Screen name="BookDetail" component={BookDetail} options={{ headerShown: false }} />

                <Stack.Screen name="EventDetail" component={EventDetail} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App;
