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
  Dimensions,
} from "react-native";
import Header from "../components/Header";
import Input from "../components/Input";
import { GET_SERVICE_LIST } from "../utils/config";
import Toast from "react-native-toast-message";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const height = Dimensions.get("window").height / 7;

export default function ServiceList({ navigation }) {
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [filteredArray, setFilteredArray] = useState([]);

  useEffect(() => {
    getData().then((response) => {
      setUserId(response._id);
      getServicesList(response._id);
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
  const getServicesList = (value) => {
    setLoading(true);
    var object = {
      user_id: value,
    };
    console.log(object);
    axios
      .get(GET_SERVICE_LIST + "/" + value)
      .then(function (response) {
        console.log(response.data);
        if (response.data.error) {
          setLoading(false);
          Toast.show({
            type: "error",
            text1: "Error",
            text2: response.data.error_msg,
          });
        } else {
          console.log(response.data);
          setData(response.data.services);
          setFilteredArray(response.data.services)
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

  const renderItem = ({ item }) => <Item item={item} />;
  const Item = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        navigation.navigate("EditService", {
          id: item._id,
          item, item
        });
      }}
    >
      <View style={styles.first_section}>
        <Image
          source={{ uri: item.feature_image }}
          style={{ height: "100%", width: "100%", borderRadius: 8 }}
          resizeMode="contain"
        />
      </View>
      <View style={styles.second_section}>
        <Text style={styles.title_text}>{item.name}</Text>
        <Text style={styles.availability_days_text}>{item.available_days}</Text>
        <Text style={styles.availability_time_text}>
          {item.start_time + " - " + item.end_time}
        </Text>
      </View>
      <View style={styles.third_section}>
        <Text style={styles.price_text}>
          {"$"}
          {item.amount}
        </Text>
      </View>
    </TouchableOpacity>
  );
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
    const filtered = data.filter(obj => obj.name.toLowerCase().indexOf(text.toLowerCase()) === 0);
    setFilteredArray(filtered);
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header heading={"Service List"} />
      <Input
        placeholder={"Search"}
        value={searchValue}
        onChangeText={handleInput}
      />
      <FlatList
        data={filteredArray}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        listEmptyComponent={listEmptyComponent}
      />
      <TouchableOpacity
        style={styles.floating_button}
        onPress={() => {
          navigation.navigate("AddService");
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
    backgroundColor: "#cdcdcd",
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
  price_text: {
    fontSize: 16,
    fontWeight: "500",
    color: "#BA9743",
  },
  capital_letter: {
    fontWeight: "bold",
  },
  floating_button: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  item: {
    height: height,
    padding: 5,
    marginHorizontal: 16,
    flexDirection: "row",
    borderBottomColor: "#cdcdcd",
    borderBottomWidth: 0.5,
  },
  title_text: {
    fontSize: 16,
    color: "#BA9743",
    fontWeight: "400",
    marginVertical: 2.5,
  },
  availability_days_text: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "500",
    marginVertical: 2.5,
  },
  availability_time_text: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "300",
    marginVertical: 2.5,
  },
  first_section: {
    width: "30%",
    height: "100%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  second_section: {
    width: "50%",
    height: "100%",
    borderRadius: 10,
    // justifyContent: "center",
    // alignItems: "center",
    padding: 10,
  },
  third_section: {
    width: "20%",
    height: "100%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});
