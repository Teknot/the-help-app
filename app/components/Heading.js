import React from "react";
import { StyleSheet, Text } from "react-native";

const Heading = ({ title }) => {
  return <Text style={styles.heading_text}>{title}</Text>;
};
export default Heading;

const styles = StyleSheet.create({
  heading_text: {
    fontSize: 22,
    marginHorizontal: 20,
  },
});
