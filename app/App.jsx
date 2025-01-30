import React, { useEffect, useState } from "react";
import { BackHandler } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TodoListScreen from "./src/screens/ListScreen";
import TodoDetailScreen from "./src/screens/DetailScreen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import { Snackbar } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { MessageProvider } from "./src/contexts/MessageContext";
import { LoadingProvider } from "./src/contexts/LoadingContext";
import theme from "./src/theme";
import DefaultIcon from "./src/icons/default";

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

export default function App() {
  const [exitApp, setExitApp] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  useEffect(() => {
    const backAction = () => {
      if (exitApp) {
        BackHandler.exitApp();
      } else {
        setExitApp(true);
        setSnackbarVisible(true);
        setTimeout(() => setExitApp(false), 2000);
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [exitApp]);

  return (
    <SafeAreaProvider>
      <PaperProvider
        theme={theme}
        settings={{ icon: (props) => <DefaultIcon {...props} /> }}
      >
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
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={2000}
        >
          Press back again to exit
        </Snackbar>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
