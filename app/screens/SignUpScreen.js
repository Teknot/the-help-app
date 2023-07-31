import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import Toast from "react-native-toast-message";
import axios from "axios";

import Input from "../components/Input";
import Button from "../components/Button";
import { SIGN_UP } from "../utils/config";

const width = Dimensions.get("window").width / 3;

export default function SignUpScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function CheckPassword(password) {
    var paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    if (password.match(paswd)) {
      return true;
    } else {
      return false;
    }
  }
  const validate = () => {
    if (firstName === "" || firstName.length === 0) {
      console.log("world");
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
    } else if (password === "" || password.length === 0) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please Enter Password",
      });
    }
    // else if (!CheckPassword(password)) {
    //   Toast.show({
    //     type: "error",
    //     text1: "Error",
    //     text2: "Please follow password policy",
    //   });
    // }
    else {
      var userObject = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        password: password,
      };
      signUp(userObject);
    }
  };

  const signUp = (object) => {
    setLoading(true);
    axios
      .post(SIGN_UP, object)
      .then(function (response) {
        console.log(response);
        setLoading(false);

        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Welcome To Thee Help",
        });
        // storeData(response);
        navigation.navigate("SignIn");
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
      {/* <Header /> */}
      <KeyboardAvoidingView behavior="height">
        <ScrollView>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text
              style={{
                marginHorizontal: 25,
                marginVertical: 8,
                fontSize: 32,
                fontWeight: "bold",
                color: "#BA9743",
              }}
            >
              Sign Up
            </Text>
          </View>
          <Input
            placeholder={"First Name"}
            value={firstName}
            onChangeText={setFirstName}
          />
          <Input
            placeholder={"Last Name"}
            value={lastName}
            onChangeText={setLastName}
          />
          <Input placeholder={"Phone"} value={phone} onChangeText={setPhone} />
          <Input placeholder={"Email"} value={email} onChangeText={setEmail} />
          <Input
            placeholder={"Password"}
            value={password}
            onChangeText={setPassword}
            isPassword={true}
          />
          {/* <Text style={[styles.forgot_style, styles.text_style]}>
        Forgot Password?
      </Text> */}
          <Button title={"Sign Up"} onPress={validate} loading={loading} />

          <View
            style={{
              alignSelf: "baseline",
              marginBottom: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 15,
              }}
            >
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#efefef",
                  width: 100,
                  height: 1,
                }}
              ></View>
              <Text style={{ ...styles.text_style, marginHorizontal: 20 }}>
                Or continue with
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#efefef",
                  width: 100,
                  height: 1,
                }}
              ></View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginVertical: 15,
              }}
            >
              <TouchableOpacity
                style={{
                  width: width,
                  borderColor: "#efefef",
                  borderRadius: 20,
                  borderWidth: 0.5,
                  paddingVertical: 10,
                  marginHorizontal: 10,
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Image
                  source={require("../assets/gmail-logo.png")}
                  style={{ width: 22, height: 20 }}
                />
                <Text>Gmail</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: width,
                  borderColor: "#efefef",
                  borderRadius: 20,
                  borderWidth: 0.5,
                  paddingVertical: 10,
                  marginHorizontal: 10,
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Image
                  source={require("../assets/facebook-logo.png")}
                  style={{ width: 10, height: 20 }}
                />
                <Text>Facebook</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Text style={[styles.forgot_style, styles.text_style]}>
                Already have an account?
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SignIn");
                }}
              >
                <Text style={styles.signup_text_style}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    // alignItems: "center",
  },
  inner_container: {
    flex: 1,
    justifyContent: "center",
  },
  forgot_style: {
    alignSelf: "flex-end",
    marginRight: 20,
  },
  continue_style: {
    marginLeft: 25,
  },
  text_style: {
    color: "grey",
    marginVertical: 10,
    fontSize: 12,
  },
  center_text_style: {
    alignSelf: "center",
  },
  signup_text_style: {
    color: "#BA9743",
    marginVertical: 10,
    fontSize: 12,
    fontWeight: "bold",
  },
});
