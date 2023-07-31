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
import { ADD_CLIENT } from "../utils/config";

export default function AddClient({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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
    if (firstName === "" || firstName.length === 0) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please Enter First Name",
      });
    } else if (lastName === "" || lastName.length === 0) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please Enter Last Name",
      });
    } else if (email === "" || email.length === 0) {
      console.log("world");
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please Enter Email",
      });
    } else if (phone === "" || phone.length === 0) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please Enter Phone Number",
      });
    } else {
      var userObject = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        user_id: userId,
      };
      addClient(userObject);
    }
  };

  const addClient = (object) => {
    setLoading(true);
    axios
      .post(ADD_CLIENT, object)
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
      <Header heading={"Add Client"}></Header>
      <View style={styles.center_section}>
        <Text style={styles.text}>First Name</Text>
        <Input
          placeholder={"First Name"}
          value={firstName}
          onChangeText={setFirstName}
        />
        <Text style={styles.text}>Last Name</Text>
        <Input
          placeholder={"Last Name"}
          value={lastName}
          onChangeText={setLastName}
        />
        <Text style={styles.text}>Email</Text>
        <Input placeholder={"Email"} value={email} onChangeText={setEmail} />
        <Text style={styles.text}>Phone Number</Text>
        <Input
          placeholder={"Phone Number"}
          value={phone}
          onChangeText={setPhone}
        />
        <Button
          title={"Add Client"}
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
