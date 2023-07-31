import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const Header = ({ heading, icon, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{heading}</Text>
      {icon ? (
        <TouchableOpacity style={styles.edit_icon} onPress={onPress}>
          <Feather name="edit" size={20} color="#cdcdcd" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    // alignItems: "center",
    padding: 10,
    marginVertical: 5,
    flexDirection: "row",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  edit_icon: {
    position: "absolute",
    top: 12,
    right: 30,
  },
});
