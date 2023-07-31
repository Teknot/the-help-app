import React from "react";
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
const ButtonWithIcon = ({ onPress, title, color }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...styles.appButtonContainer, backgroundColor: color }}
    >
      <Text style={styles.appButtonText}>{title}</Text>
      <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
    </TouchableOpacity>
  );
};
export default ButtonWithIcon;

const styles = StyleSheet.create({
  appButtonContainer: {
    // elevation: 8,
    backgroundColor: "#F1F6FB",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 5,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  appButtonText: {
    fontSize: 16,
    color: "#000000",
    alignSelf: "center",
  },
});