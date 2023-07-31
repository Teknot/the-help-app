import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Toast from "react-native-toast-message";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  StatusBar,
  FlatList,
} from "react-native";
import {
  GET_ALL_APPOINTMENT_LIST,
  GET_APPOINTMENT_LIST,
} from "../utils/config";
import Header from "../components/Header";
import Input from "../components/Input";
export default function ScheduleListScreen({navigation}) {
  const [appointmentList, setAppointmentList] = useState([]);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    getData().then((response) => {
      setUserId(response._id);
      getAppointmentsList(response._id);
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
  const getAppointmentsList = (value) => {
    setLoading(true);
    var object = {
      user_id: value,
    };
    axios
      .get(GET_ALL_APPOINTMENT_LIST + "/" + value)
      .then(function (response) {
        if (response.data.error) {
          setLoading(false);
          Toast.show({
            type: "error",
            text1: "Error",
            text2: response.data.error_msg,
          });
        } else {
          console.log(response.data.appointments);
          setAppointmentList(response.data.appointments);
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
      });
  };
  function generateRandomColor() {
    let maxVal = 0xffffff; // 16777215
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    return `#${randColor.toUpperCase()}`;
  }
  const Item = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("EditAppointment", {
            id: item._id,
            item: item,
          });
        }}
        style={styles.item}
      >
        <View style={styles.list_first_section}>
          <Text style={styles.list_time_text}>{item.appointment_date}</Text>
          <Text style={styles.list_time_text}>{item.appointment_time}</Text>
        </View>
        <View style={styles.list_second_section}>
          <View
            style={{
              height: "100%",
              backgroundColor: "#BA9743",
              width: 10,
              borderTopLeftRadius: 15,
              borderBottomLeftRadius: 15,
            }}
          ></View>
          <View style={styles.list_second_inner_section}>
            <Text style={styles.list_title_text}>{item.title}</Text>
            <Text style={styles.list_client_text}>
              {item.client_first_name + " " + item.client_last_name}
            </Text>
            <Text style={styles.list_notes_text}>{item.message}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const renderItem = ({ item }) => {
    return <Item item={item} />;
  };
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
      <Header heading={"Appointment List"} />
      <Input
        placeholder={"Search"}
        value={searchValue}
        onChangeText={setSearchValue}
      />
      <FlatList
        data={appointmentList}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        listEmptyComponent={listEmptyComponent}
      />
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
  header_section: {
    flexDirection: "row",
    marginHorizontal: 20,
    paddingTop: 10,
    // paddingHorizontal: 5,
  },
  header_title_section: {
    flexDirection: "column",
    width: "80%",
  },
  header_image_section: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  header_image: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  header_primary_text: {
    fontSize: 16,
    color: "#BA9743",
    fontWeight: "500",
    marginHorizontal: 5,
  },
  header_secondary_text: {
    fontSize: 18,
    color: "#000000",
    fontWeight: "bold",
    marginVertical: 2.5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    marginTop: 15,
    marginHorizontal: 20,
  },
  calendar_section: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  item: {
    // paddingVertical: 20,
    // paddingHorizontal: 10,
    // justifyContent: "center",
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    flexDirection: "row",
    // borderRadius: 15,
    // elevation: 5,
    // marginVertical: 5,
  },
  list_first_section: {
    width: "25%",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  list_second_section: {
    // paddingVertical: 20,
    // paddingHorizontal: 10,
    width: "75%",
    backgroundColor: "#ffffff",
    borderRadius: 15,
    elevation: 5,
    marginVertical: 5,
    flexDirection: "row",
  },
  list_second_inner_section: {
    flexDirection: "column",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  list_time_text: {
    fontSize: 12,
    color: "#000000",
    marginVertical: 2.5,
    fontWeight: "600",
  },
  list_title_text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginVertical: 2.5,
  },
  list_client_text: {
    fontSize: 14,
    fontWeight: "600",
    color: "#736D6E",
    marginVertical: 2.5,
  },
  list_notes_text: {
    fontSize: 12,
    fontWeight: "400",
    color: "#AFABAC",
    marginVertical: 2.5,
  },
});
