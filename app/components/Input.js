import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

const Input = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  image,
  keyboardType,
  onEndEditing,
  error,
  errorMessage,
  isPassword,
  editable
}) => {
  //const {inputStyle, labelStyle, containerStyle} = styles;
  const [isPasswordSecure, setPasswordSecure] = useState(false);
  return (
    <View style={{ marginHorizontal: 20 }}>
      <View style={styles.sectionStyle}>
        <TextInput
          style={{ flex: 1, marginHorizontal: 7.5, paddingVertical: 5 }}
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
          keyboardType={keyboardType}
          underlineColorAndroid="transparent"
          onEndEditing={onEndEditing}
          secureTextEntry={isPasswordSecure}
          editable={editable}
        />
        {isPassword ? (
          <TouchableOpacity
            onPress={() => {
              // console.log("Hello", isPasswordSecure);
              setPasswordSecure(!isPasswordSecure);
            }}
          >
            <FontAwesome
              name={isPasswordSecure ? "eye" : "eye-slash"}
              size={18}
              color={"grey"}
              style={styles.imageStyle}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      {error ? <Text style={{ color: "#FF0000" }}>{errorMessage}</Text> : null}
    </View>
  );
};
export default Input;
const styles = StyleSheet.create({
  sectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#BA9743",
    height: 54,
    borderRadius: 8,
    marginVertical: 5,
    padding: 10,
  },
  imageStyle: {
    margin: 5,
    height: 20,
    width: 20,
    alignItems: "center",
  },
});
