import React, { useEffect, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import axios from "axios";
import Header from "../components/Header";
import Input from "../components/Input";
import { GET_INVOICE_LIST } from "../utils/config";

const height = Dimensions.get("window").height / 7;

export default function InvoiceList({ navigation }) {
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [filteredArray, setFilteredArray] = useState([]);

  useEffect(() => {
    getData().then((response) => {
      setUserId(response._id);
      getInvoiceList(response._id);
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
  const getInvoiceList = (value) => {
    setLoading(true);
    var object = {
      user_id: value,
    };
    axios
      .get(GET_INVOICE_LIST + "/" + value)
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
          setData(response.data.invoices);
          setFilteredArray(response.data.invoices)
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
        navigation.navigate("EditInvoice", {
          id: item._id,
        });
      }}
    >
      <View style={styles.second_section}>
        <Text style={styles.id_text}>{item.invoice_number}</Text>
        <Text style={styles.date_text}>{item.due_date}</Text>
        <Text style={styles.amount_text}>
          {"$"}
          {item.amount}
        </Text>
      </View>
      <View style={styles.third_section}>
        <Text style={styles.title_text}>
          {item.client_first_name + " " + item.client_last_name}
        </Text>
        <Text
          style={{
            ...styles.date_text,
            paddingHorizontal: 20,
            paddingVertical: 5,
            borderRadius: 20,
            backgroundColor:
              item.status === "pending"
                ? "rgba(255, 214, 107, 0.16)"
                : item.status === "cancel"
                  ? "rgba(0, 0, 0, 0.16)"
                  : item.status === "paid"
                    ? "rgba(186, 151, 67, 0.16)"
                    : "",
          }}
        >
          {item.status}
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
    const filtered = data.filter(obj => obj.invoice_number.toLowerCase().indexOf(text.toLowerCase()) === 0);
    setFilteredArray(filtered);
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header heading={"Invoice List"} />
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
          navigation.navigate("AddInvoice");
        }}
      >
        <Image source={require("../assets/add-icon.png")}></Image>
      </TouchableOpacity>
      <Toast />
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
  amount_text: {
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
  id_text: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "500",
    marginVertical: 2.5,
  },
  date_text: {
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
    width: "60%",
    height: "100%",
    borderRadius: 10,
    // justifyContent: "center",
    // alignItems: "center",
    padding: 10,
  },
  third_section: {
    width: "40%",
    height: "100%",
    borderRadius: 10,
    // justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  paid_style: {
    backgroundColor: "rgba(186, 151, 67, 0.16)",
  },
  cancel_style: {
    backgroundColor: "rgba(0, 0, 0, 0.16)",
  },
  pending_style: {
    backgroundColor: "rgba(255, 214, 107, 0.16)",
  },
});
