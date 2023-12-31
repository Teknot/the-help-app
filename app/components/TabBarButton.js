import React from "react";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { FontAwesome as Icon } from "@expo/vector-icons";
// import { TabBg } from '../svg';

export const TabBarButton = ({ bgColor, ...props }) => (
  <View style={styles.container} pointerEvents="box-none">
    {/* <TabBg
      color={bgColor}
      style={styles.background}
    /> */}
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Image source={require("../assets/add-icon.png")} style={styles.buttonIcon} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: 75,
    alignItems: "center",
    backgroundColor:"#000000"
  },
  background: {
    position: "absolute",
    top: 0,
  },
  button: {
    top: -22.5,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 27,
    backgroundColor: "#E94F37",
  },
  buttonIcon: {
    fontSize: 16,
    color: "#F6F7EB",
  },
});
