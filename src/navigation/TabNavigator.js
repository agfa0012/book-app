import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackNavigator from "./HomeStackNavigator";
import Borrowed from "../screens/Borrowed";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Borrowed"
        component={Borrowed}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="library" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
