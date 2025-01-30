import React, { useEffect } from "react";
import { BackHandler, ToastAndroid } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TodoListScreen from "./src/screens/ListScreen";
import TodoDetailScreen from "./src/screens/DetailScreen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import { MessageProvider } from "./src/contexts/MessageContext";
import { StatusBar } from "expo-status-bar";
import { LoadingProvider } from "./src/contexts/LoadingContext";
import theme from "./src/theme";
import DefaultIcon from "./src/icons/default";

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

export default function App() {
  const [exitApp, setExitApp] = useState(false);

  useEffect(() => {
    const backAction = () => {
      if (exitApp) {
        BackHandler.exitApp();
      } else {
        setExitApp(true);
        ToastAndroid.show("Press back again to exit", ToastAndroid.SHORT);
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
      </PaperProvider>
    </SafeAreaProvider>
  );
}
