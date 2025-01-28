import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TodoListScreen from "./src/screens/listScreen";
import TodoDetailScreen from "./src/screens/DetailScreen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PaperProvider } from "react-native-paper";

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

export default function App() {
  return (
    <PaperProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen 
              name="TodoList" 
              component={TodoListScreen} 
              options={{ headerShown: true }} // Show Appbar on this screen
            />
            <Stack.Screen 
              name="TodoDetail" 
              component={TodoDetailScreen} 
              options={{ headerShown: true }} // Show header for detail screen
            />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </PaperProvider>
  );
}
