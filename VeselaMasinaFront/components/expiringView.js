import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const ExpiringView = ({ state }) => {
  const [visible, setVisible] = useState(state);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return visible ? (
    <View style={styles.popup}>
      <Text style={styles.popupText}>Congratulations, just go on</Text>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  popup: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    elevation: 4,
    zIndex: 9999,
  },
  popupText: {
    fontSize: 16,
    color: "#333",
  },
});

export default ExpiringView;
