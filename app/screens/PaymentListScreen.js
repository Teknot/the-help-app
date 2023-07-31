import React, { useState } from "react";
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

const height = Dimensions.get("window").height / 7;

export default function PaymentList({ navigation }) {
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);
  const renderItem = ({ item }) => <Item item={item} />;
  const Item = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      //   onPress={() => {
      //     navigation.navigate("Subject", {
      //       id: item.id,
      //     });
      //   }}
    >
      {/* <View style={styles.first_section}>
        <Image
          source={{ uri: item.image }}
          style={{ height: "100%", width: "100%", borderRadius: 8 }}
          resizeMode="contain"
        />
      </View> */}
      <View style={styles.second_section}>
        <Text style={styles.title_text}>{"Paid to"}</Text>
        <Text style={styles.availability_text}>{item.customer_name}</Text>
        <Text style={styles.availability_text}>{item.payment_medium}</Text>
      </View>
      <View style={styles.third_section}>
        <Text style={styles.price_text}>
          {"$"}
          {item.price}
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
  return (
    <SafeAreaView style={styles.container}>
      <Header heading={"Payment History"} />
      <Input
        placeholder={"Search"}
        value={searchValue}
        onChangeText={setSearchValue}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        listEmptyComponent={listEmptyComponent}
      />
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
    borderColor: "#BA97435C",
    borderWidth: 1,
    borderRadius: 12,
    marginVertical: 5,
  },
  title_text: {
    fontSize: 12,
    color: "#000",
    fontWeight: "400",
    marginVertical: 2.5,
  },
  availability_text: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "500",
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
    width: "70%",
    height: "100%",
    borderRadius: 10,
    // justifyContent: "center",
    // alignItems: "center",
    padding: 10,
  },
  third_section: {
    width: "30%",
    height: "100%",
    borderRadius: 10,
    // justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});
