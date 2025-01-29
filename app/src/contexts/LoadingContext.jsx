// src/contexts/LoadingContext.js
import React, { createContext, useState } from "react";
import { Modal, View, ActivityIndicator } from "react-native";
import styles from "../styles";

export const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
      {/* Modal for Loading Spinner */}
      <Modal visible={loading} transparent={true} animationType="fade">
        <View style={styles.modalBackground}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      </Modal>
    </LoadingContext.Provider>
  );
};
