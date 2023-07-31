import React, { useState, useEffect } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import Toast from "react-native-toast-message";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Header from "../components/Header";
import Input from "../components/Input";
import { GET_CLIENT_LIST } from "../utils/config";

export default function ClientList({ navigation }) {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [userId, setUserId] = useState("");
  const [filteredArray, setFilteredArray] = useState([]);

  useEffect(() => {
    getData().then((response) => {
      setUserId(response._id);
      getClientsList(response._id);
    });
  }, []);
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@access_Key");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
      Toast.show({
        type: "error",
        text1: "Error",
        text2: e.toString(),
      });
      console.log(e.toString());
    }
  };
  const getClientsList = (value) => {
    setLoading(true);
    var object = {
      user_id: value,
    };
    axios
      .get(GET_CLIENT_LIST + "/" + value)
      .then(function (response) {
        if (response.data.error) {
          setLoading(false);
          Toast.show({
            type: "error",
            text1: "Error",
            text2: response.data.error_msg,
          });
        } else {
          console.log(response.data);
          setData(response.data.clients);
          setFilteredArray(response.data.clients)
          setLoading(false);
        }
      })
      .catch(function (error) {
        setLoading(false);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.toString(),
        });
        console.log("error: " + error);
      });
  };

  const Item = ({ item }) => (
    <TouchableOpacity
      style={styles.item_section}
      onPress={() =>
        navigation.navigate("EditClient", {
          id: item._id,
        })
      }
    >
      <View style={styles.image_section}>
        <Text style={styles.capital_letter}>
          {item.first_name.charAt(0).toUpperCase() +
            item.last_name.charAt(0).toUpperCase()}
        </Text>
      </View>
      <View style={styles.detail_section}>
        <Text style={styles.name_text}>
          {item.first_name + " " + item.last_name}
        </Text>
        <Text style={styles.email_text}>{item.email}</Text>
      </View>
    </TouchableOpacity>
  );
  const renderItem = ({ item }) => <Item item={item} />;
  const listEmptyComponent = () => (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Image
        style={{ height: 300, width: 300 }}
        resizeMode="cover"
        source={require("../assets/empty_box.png")}
      ></Image>
    </View>
  );
  const handleInput = (text) => {
    setSearchValue(text);
    const filtered = data.filter(obj => obj.first_name.toLowerCase().indexOf(text.toLowerCase()) === 0);
    setFilteredArray(filtered);
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header heading={"Client List"} />
      <Input
        placeholder={"Search"}
        value={searchValue}
        onChangeText={handleInput}
      />
      <FlatList
        data={filteredArray}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={listEmptyComponent}
      />
      <TouchableOpacity
        style={styles.floating_button}
        onPress={() => {
          navigation.navigate("AddClient");
        }}
      >
        <Image source={require("../assets/add-icon.png")}></Image>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginTop: StatusBar.currentHeight,
  },
  item_section: {
    padding: 15,
    marginVertical: 3,
    marginHorizontal: 16,
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderColor: "#cdcdcd",
  },
  image_section: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(186, 151, 67, 0.16)",
  },
  detail_section: {
    flexDirection: "column",
    marginLeft: 15,
  },
  name_text: {
    fontSize: 14,
    fontWeight: "400",
    color: "#BA9743",
  },
  email_text: {
    fontSize: 14,
    fontWeight: "200",
  },
  capital_letter: {
    fontWeight: "bold",
  },
  floating_button: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
