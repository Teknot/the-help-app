import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import Toast from "react-native-toast-message";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Button from "../components/Button";
import Header from "../components/Header";
import Input from "../components/Input";
import { UPDATE_PASSWORD } from "../utils/config";

export default function ResetPassword({ navigation }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData().then((response) => {
      setUserId(response._id);
    });
  }, []);
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@access_Key");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: e.toString(),
      });
      console.log(e.toString());
    }
  };
  const validate = () => {
    if (oldPassword === "" || oldPassword.length === 0) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please Enter Old Password",
      });
    } else if (newPassword === "" || newPassword.length === 0) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please Enter New Password",
      });
    } else if (confirmPassword === "" || confirmPassword.length === 0) {
      console.log("world");
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please Enter Confirm Password",
      });
    } else if (newPassword.toString() !== confirmPassword.toString()) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please Re-confirm Your Password",
      });
    } else {
      var passwordObject = {
        old_password: oldPassword,
        new_password: newPassword,
        user_id: userId,
      };
      updatePassword(passwordObject);
    }
  };

  const updatePassword = (object) => {
    setLoading(true);
    console.log(object);
    console.log(UPDATE_PASSWORD);
    axios
      .put(UPDATE_PASSWORD, object)
      .then(function (response) {
        console.log(response.data);
        setLoading(false);
        if (!response.data.error) {
          Toast.show({
            type: "success",
            text1: "Success",
            text2: response.data.success_msg,
          });
          navigation.navigate("HomeTab");
        } else {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: response.data.error_msg,
          });
        }
      })
      .catch(function (error) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.toString(),
        });
        setLoading(false);
        console.log("error: " + error);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header heading={"Update Password"}></Header>
      <View style={styles.center_section}>
        <Text style={styles.text}>Old Password</Text>
        <Input
          placeholder={"Old password"}
          value={oldPassword}
          onChangeText={setOldPassword}
        />
        <Text style={styles.text}>New Password</Text>
        <Input
          placeholder={"New Password"}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <Text style={styles.text}>Re-Confirm Password</Text>
        <Input
          placeholder={"Re-Confirm Password"}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <Button
          title={"Update Password"}
          onPress={() =>
            // navigation.navigate("HomeTab")
            validate()
          }
          loading={loading}
        />
      </View>
      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginTop: StatusBar.currentHeight,
    // justifyContent: "center",
  },
  center_section: {
    marginHorizontal: 10,
  },
  text: {
    color: "#000000",
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "bold",
    marginHorizontal: 20,
  },
});
