import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { SkypeIndicator } from "react-native-indicators";
import { LinearGradient } from "expo-linear-gradient";

const Button = ({ onPress, title, color, loading }) => {
  return (
    <>
      {loading ? (
        <LinearGradient
          style={{ ...styles.appButtonContainer, height: 42 }}
          colors={["#BA9743", "#FFD66B", "#BA9743"]}
          start={[0, 1]}
          end={[1, 0]}
        >
          {/* <View
            style={{
              ...styles.appButtonContainer,
              backgroundColor: color,
              height: 42,
            }}
          > */}
          <SkypeIndicator color="white" size={32} />
          {/* </View> */}
        </LinearGradient>
      ) : (
        <LinearGradient
          style={{ ...styles.appButtonContainer }}
          colors={["#BA9743", "#FFD66B", "#BA9743"]}
          start={[0, 1]}
          end={[1, 0]}
        >
          <TouchableOpacity onPress={onPress}>
            <Text style={styles.appButtonText}>{title}</Text>
          </TouchableOpacity>
        </LinearGradient>
      )}
    </>
  );
};
export default Button;

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 20,
    marginHorizontal: 20,
  },
  appButtonText: {
    fontSize: 18,
    color: "#000",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
