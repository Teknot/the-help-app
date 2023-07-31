import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import { Agenda, Calendar } from "react-native-calendars";
import Toast from "react-native-toast-message";
import dateFormat, { masks } from "dateformat";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GET_APPOINTMENT_LIST } from "../utils/config";
import { MaterialIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";

const weekListWidth = Dimensions.get("window").width / 8;
export default function HomeScreen({ navigation }) {
  const isFocused = useIsFocused();
  const [appointmentList, setAppointmentList] = useState([]);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const date = new Date();
  const currentDate = dateFormat(date, "isoDate");

  function generateRandomColor() {
    let maxVal = 0xffffff; // 16777215
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    return `#${randColor.toUpperCase()}`;
  }
  useEffect(() => {
    if (isFocused) {
      getData().then((response) => {
        setUserId(response._id);
        setFirstName(response.first_name);
        getAppointmentsList(response._id, currentDate);
      });
    }
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
  const getAppointmentsList = (value, current_date) => {
    setLoading(true);
    var object = {
      date: current_date,
    };
    console.log("URL", GET_APPOINTMENT_LIST + "/" + value + "/" + current_date);

    axios
      .get(GET_APPOINTMENT_LIST + "/" + value + "/" + current_date)
      .then(function (response) {
        console.log(response.data);
        if (response.data.error) {
          setLoading(false);
          Toast.show({
            type: "error",
            text1: "Error",
            text2: response.data.error_msg,
          });
          setAppointmentList([]);
        } else {
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
  const getMarkedDates = (baseDate) => {
    if (appointmentList.length !== 0) {
      var markedDates = {};
      var secondaryObject = {};
      for (var i = 0; i < appointmentList.length; i++) {
        const objectName = new Date(appointmentList[i].appointment_date)
          .toISOString()
          .substring(0, 10);
        const value = {
          [objectName]: {
            marked: true,
          },
        };
        markedDates = Object.assign(value);
      }
      return markedDates;
    } else {
      const markedDates = {};
      markedDates[baseDate] = { selected: true };
      return markedDates;
    }
  };
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
          {/* <Text style={styles.list_time_text}>{item.date}</Text> */}
          <Text style={styles.list_time_text}>{item.appointment_time}</Text>
        </View>
        <View style={styles.list_second_section}>
          <View
            style={{
              height: "100%",
              // backgroundColor: generateRandomColor(),
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
  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem("@access_Key");
    } catch (e) {
      // remove error
    }

    console.log("Done.");
  };
  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header_section}>
        <View style={styles.header_title_section}>
          <View style={{ flexDirection: "row" }}>
            {/* <Image
              style={styles.header_image}
              source={{ uri: "https://picsum.photos/200" }}
            ></Image> */}
            <Text>Hi</Text>
            <Text style={styles.header_primary_text}>{firstName + ","}</Text>
          </View>
          {/* <Text style={styles.header_secondary_text}>Welcome Back</Text> */}
        </View>
        <TouchableOpacity
          style={styles.header_image_section}
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        >
          {/* <Image
            style={styles.header_image}
            source={{ uri: "https://picsum.photos/200" }}
          ></Image> */}
          <MaterialIcons name="logout" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{"Scheduling"}</Text>
      <Calendar
        onDayPress={(day) => {
          getAppointmentsList(userId, day.dateString);

          // console.log("selected day", day);
          // console.log("new Date", formatDate(day.dateString));
        }}
        markedDates={getMarkedDates(currentDate)}
        style={styles.calendar_section}
        theme={{
          selectedDayBackgroundColor: "#BA9743",
          backgroundColor: "#BA9743",
        }}
      />
      <FlatList
        data={appointmentList}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={listEmptyComponent}
      />
      {/* <Agenda
        items={{
          "2023-01-01": [{ name: "item 1 - any js object" }],
          "2023-01-23": [{ name: "item 2 - any js object" }],
          "2023-01-25": [
            { name: "item 3 - any js object" },
            { name: "any js object" },
          ],
        }}
        // Callback that gets called when items for a certain month should be loaded (month became visible)
        loadItemsForMonth={(month) => {
          console.log("trigger items loading");
        }}
        onDayPress={(day) => {
          console.log("day pressed");
        }}
        selected={"2023-01-01"}
        renderItem={renderItem}
        hideKnob={false}
        showClosingKnob={true}
        markedDates={{
          "2023-01-16": { selected: true, marked: true },
          "2023-01-17": { marked: true },
          "2023-01-18": { disabled: true },
        }}
        theme={{
          // ...calendarTheme,
          // agendaDayTextColor: 'yellow',
          agendaDayNumColor: "green",
          agendaTodayColor: "red",
          agendaKnobColor: "#BA9743",
          backgroundColor:"#ffffff"
        }}
        style={{}}
      /> */}
      <Toast />
    </ScrollView>
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
