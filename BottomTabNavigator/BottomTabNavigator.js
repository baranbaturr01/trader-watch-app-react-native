import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from "../screens/Home";
import Profile from "../screens/Profile";
import UserTrades from "../screens/UserTrades";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={({ route }) => {
            return {
                headerShown: false,
                tabBarActiveTintColor: '#FFFFFF',
                tabBarStyle: {
                    backgroundColor: '#005B41',
                }
            }
        }}>
            <Tab.Screen name="Ana Sayfa" options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="analytics" size={size} color={color} />
                )
            }} component={HomeScreen} />
            <Tab.Screen name="Hisselerim" options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="list" size={size} color={color} />
                )
            }} component={UserTrades} />
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

export default BottomTabNavigator;
