import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//icons
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from "../screens/Home";
import Details from "../screens/Details";
import Profile from "../screens/Profile";


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Ana Sayfa" options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="analytics" size={size} color={color} />
                )
            }} component={HomeScreen} />
            <Tab.Screen name="
            Hisselerim" options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="list" size={size} color={color} />
                    )
                }} component={Details} />
            <Tab.Screen name="Rapor" options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="hourglass" size={size} color={color} />
                )
            }} component={Profile} />
            <Tab.Screen name="Profil" options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="person" size={size} color={color} />
                )
            }} component={Profile} />
        </Tab.Navigator>
    )
}

export default BottomTabNavigator