import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TodoListScreen from "./src/screens/ListScreen";
import TodoDetailScreen from "./src/screens/DetailScreen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import { MessageProvider } from "./src/contexts/MessageContext";
import { StatusBar } from "expo-status-bar";
import { LoadingProvider } from "./src/contexts/LoadingContext";

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <MessageProvider>
          <LoadingProvider>
            <QueryClientProvider client={queryClient}>
              <NavigationContainer>
                <Stack.Navigator>
                  <Stack.Screen
                    name="TodoList"
                    component={TodoListScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="TodoDetail"
                    component={TodoDetailScreen}
                    options={{ headerShown: false }}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </QueryClientProvider>
          </LoadingProvider>
        </MessageProvider>
        <StatusBar />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
