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
} from "react-native";
import axios from "axios";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Input from "../components/Input";
import Button from "../components/Button";
import { SIGN_IN } from "../utils/config";

const width = Dimensions.get("window").width / 3;

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("test1@gmail.com");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (email === "" || email.length === 0) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please Enter User Name Or Email",
      });
    } else if (password === "" || password.length === 0) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please Enter Password",
      });
    } else {
      var loginObject = {
        email: email,
        password: password,
      };
      login(loginObject);
    }
  };
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@access_Key", jsonValue);
    } catch (e) {
      // saving error
      console.log(e.toString());
    }
  };
  const login = (object) => {
    console.log(SIGN_IN);
    console.log(object);
    setLoading(true);
    axios
      .post(SIGN_IN, object)
      .then(function (response) {
        console.log(response.data);
        if (!response.data.error) {
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "Welcome To The Help",
          });
          setLoading(false);
          storeData(response.data.user[0]);
          navigation.navigate("HomeTab");
        } else {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: response.data.error_msg,
          });
          setLoading(false);
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
      {/* <Header /> */}
      <KeyboardAvoidingView behavior="height">
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
            Login
          </Text>
          <Text
            style={{
              marginVertical: 8,
              fontSize: 22,
              fontWeight: "bold",
              color: "#000000",
              textAlign: "center",
              marginHorizontal: 20,
            }}
          >
            Bookmark this page to log in more quickly next time.
          </Text>
        </View>
        <Input placeholder={"Email"} value={email} onChangeText={setEmail} />
        <Input
          placeholder={"Password"}
          value={password}
          onChangeText={setPassword}
          isPassword={true}
        />
        <Text style={[styles.forgot_style, styles.text_style]}>
          Forgot Password?
        </Text>
        <Button title={"Login"} onPress={() => validate()} loading={loading} />
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
              Don't have an account?
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <Text style={styles.signup_text_style}>Register Now</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Toast />
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
