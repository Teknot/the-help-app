import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen({ navigation }) {
  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    getData().then((response) => {
      setUserId(response._id);
      setFirstName(response.first_name);
      setLastName(response.last_name);
      setEmail(response.email);
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
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* <Image
        style={styles.profile_image}
        source={{ uri: "https://picsum.photos/200" }}
      /> */}
      <View style={styles.profile_image}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
          {firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase()}
        </Text>
      </View>
      <Text style={styles.full_name}>{firstName + " " + lastName}</Text>
      <View style={styles.row_section}>
        <Text style={styles.row_primary_text}>User Name</Text>
        <Text style={styles.row_secondary_text}>
          {firstName + " " + lastName}
        </Text>
      </View>
      <View style={styles.horizontal_line}></View>
      <View style={styles.row_section}>
        <Text style={styles.row_primary_text}>Email</Text>
        <Text style={styles.row_secondary_text}>{email}</Text>
      </View>
      <View style={styles.horizontal_line}></View>
      <TouchableOpacity
        style={styles.row_section}
        onPress={() => {
          navigation.navigate("ResetPassword");
        }}
      >
        <Text style={styles.row_primary_text}>Reset Password</Text>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="#BA9743" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.horizontal_line}></TouchableOpacity>
      <TouchableOpacity
        style={styles.row_section}
        onPress={() => {
          navigation.navigate("ClientList");
        }}
      >
        <Text style={styles.row_primary_text}>Clients</Text>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="#BA9743" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.horizontal_line}></TouchableOpacity>
      <TouchableOpacity
        style={styles.row_section}
        onPress={() => {
          navigation.navigate("ServiceList");
        }}
      >
        <Text style={styles.row_primary_text}>Services</Text>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="#BA9743" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.horizontal_line}></TouchableOpacity>
      <TouchableOpacity
        style={styles.row_section}
        onPress={() => {
          navigation.navigate("InvoiceList");
        }}
      >
        <Text style={styles.row_primary_text}>Invoices</Text>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="#BA9743" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.horizontal_line}></TouchableOpacity>
      <TouchableOpacity
        style={styles.row_section}
        onPress={() => {
          navigation.navigate("PaymentList");
        }}
      >
        <Text style={styles.row_primary_text}>Payments</Text>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="#BA9743" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.horizontal_line}></TouchableOpacity>
      <TouchableOpacity
        style={styles.row_section}
        onPress={() => navigation.navigate("SubscriptionPlan")}
      >
        <Text style={styles.row_primary_text}>Subscription Plan</Text>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="#BA9743" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  profile_image: {
    height: 80,
    width: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(186, 151, 67, 0.16)",
  },
  full_name: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
    color: "#BA9743",
  },
  row_section: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  row_primary_text: {
    fontSize: 16,
    fontWeight: "600",
  },
  row_secondary_text: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#cdcdcd",
  },
  horizontal_line: {
    height: 1,
    width: "95%",
    backgroundColor: "#cdcdcd",
    marginVertical: 8,
  },
});
