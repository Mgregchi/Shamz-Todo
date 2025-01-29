// src/contexts/MessageContext.js
import React, { createContext } from "react";
import Toast from "react-native-toast-message";
import { View } from "react-native";

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  // Function to show a toast message
  const showMessage = ({ text, type = "success" }) => {
    Toast.show({
      type: type, // "success", "error", "info"
      text1: text,
      position: "top",
      autoHide: true,
    });
  };

  const clearMessage = () => {
    Toast.hide();
  };

  return (
    <MessageContext.Provider value={{ showMessage, clearMessage }}>
      {children}
      <Toast />
    </MessageContext.Provider>
  );
};
