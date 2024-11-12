import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BooksList from "../screens/BookList";
import BookDetail from "../screens/BookDetail";

const Stack = createStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BooksList"
        component={BooksList}
        options={{ title: "Books" }}
      />
      <Stack.Screen
        name="BookDetail"
        component={BookDetail}
        options={{ title: "Book Detail" }}
      />
    </Stack.Navigator>
  );
}
