import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

const Stack = createNativeStackNavigator();

const RoutesApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false, // Ocultar o cabeçalho se desejar
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: "Login",
            headerShown: false, // Ocultar o cabeçalho se desejar
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            title: "Register",
            headerShown: false, // Ocultar o cabeçalho se desejar
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RoutesApp;
