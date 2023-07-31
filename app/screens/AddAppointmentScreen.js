import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  StatusBar,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import {
  ADD_APPOINTMENT,
  GET_CLIENT_LIST,
  GET_SERVICE_LIST,
} from "../utils/config";
import axios from "axios";
import { SelectList } from "react-native-dropdown-select-list";
import Button from "../components/Button";
import Header from "../components/Header";
import Input from "../components/Input";
import InputWithHeight from "../components/InputWithHeight";

export default function AddAppointment({ navigation }) {
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [timePicker, setTimePicker] = useState(false);
  const [time, setTime] = useState(new Date(Date.now()));
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [clientList, setClientList] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedService, setSelectedService] = useState("");

  // var selectedService = {
  //   name: "",
  //   description: "",
  //   amount: "",
  //   start_time: "",
  //   end_time: "",
  //   service_date: "",
  //   user_id: "",
  //   feature_image: "",
  // };

  // const validate = () => {
  //   if (totalAmount <= 0) {
  //     Toast.show({
  //       type: "error",
  //       text1: "Error",
  //       text2: "Select at least one service",
  //     });
  //   } else {
  //     var invoiceObject = {
  //       due_date: date.toDateString(),
  //       amount: totalAmount,
  //       client_id: selectedClient,
  //       message: message,
  //       services: serviceIDArray,
  //       status: selectedStatus,
  //       invoice_number: invoiceNumber,
  //       user_id: userId,
  //     };
  //     console.log(selectedClient);
  //     addInvoice(invoiceObject);
  //   }
  // };
  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
  const addInvoice = (object) => {
    var object = {
      appointment_date: formatDate(date.toDateString()),
      appointment_time: time.toLocaleTimeString("en-US"),
      title: title,
      client_id: selectedClient,
      user_id: userId,
      service_id: selectedService._id,
      message: message,
    };
    console.log("object", object);
    setLoading(true);
    axios
      .post(ADD_APPOINTMENT, object)
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
  useEffect(() => {
    getData().then((response) => {
      setUserId(response._id);
      getClientsList(response._id);
      getServicesList(response._id);
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
          var clientArray = [];
          for (var i = 0; i < response.data.clients.length; i++) {
            clientArray.push({
              key: response.data.clients[i]._id,
              value:
                response.data.clients[i].first_name +
                " " +
                response.data.clients[i].last_name,
            });
          }
          setClientList(clientArray);
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
  const getServicesList = (value) => {
    setLoading(true);
    var object = {
      user_id: value,
    };
    axios
      .get(GET_SERVICE_LIST + "/" + value)
      .then(function (response) {
        if (response.data.error) {
          setLoading(false);
          Toast.show({
            type: "error",
            text1: "Error",
            text2: response.data.error_msg,
          });
        } else {
          var serviceArray = [];
          for (var i = 0; i < response.data.services.length; i++) {
            serviceArray.push({
              key: response.data.services[i],
              value: response.data.services[i].name,
            });
          }
          setServiceList(serviceArray);
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

  function showDatePicker() {
    setDatePicker(true);
  }
  function showTimePicker() {
    setTimePicker(true);
  }
  function onDateSelected(event, value) {
    setDate(value);
    setDatePicker(false);
  }
  function onTimeSelected(event, value) {
    setTime(value);
    setTimePicker(false);
  }

  return (
    <ScrollView style={styles.container}>
      <Header heading={"New Appointment"} />
      <Input placeholder={"Title"} value={title} onChangeText={setTitle} />
      <Text style={styles.text}>Client</Text>
      <SelectList
        setSelected={setSelectedClient}
        data={clientList}
        boxStyles={{ borderColor: "#BA97435C", marginHorizontal: 16 }}
        dropdownStyles={{
          borderColor: "#BA97435C",
          marginHorizontal: 16,
          borderWidth: 1,
        }}
      />
      <Text style={styles.text}>Service</Text>
      <SelectList
        setSelected={setSelectedService}
        data={serviceList}
        boxStyles={{
          borderColor: "#BA97435C",
          marginHorizontal: 16,
          borderWidth: 1,
        }}
        dropdownStyles={{
          borderColor: "#BA97435C",
          marginHorizontal: 16,
          borderWidth: 1,
        }}
      />
      <Text style={styles.text}>Time</Text>
      {/* <Input placeholder={"Date"} /> */}
      <TouchableOpacity style={styles.date_style} onPress={showTimePicker}>
        <Text>{time.toLocaleTimeString("en-US")}</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Date</Text>
      <TouchableOpacity style={styles.date_style} onPress={showDatePicker}>
        <Text>{date.toDateString()}</Text>
      </TouchableOpacity>
      {/* <Input placeholder={"Time"} /> */}
      {datePicker && (
        <DateTimePicker
          value={date}
          mode={"date"}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          is24Hour={true}
          onChange={onDateSelected}
          style={styles.date_picker}
        />
      )}

      {timePicker && (
        <DateTimePicker
          value={time}
          mode={"time"}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          is24Hour={false}
          onChange={onTimeSelected}
          style={styles.date_picker}
        />
      )}
      <Text style={styles.text}>Message</Text>
      <InputWithHeight
        placeholder={"Message"}
        value={message}
        onChangeText={setMessage}
      />
      <Button title={"Add Appointment"} onPress={addInvoice} loading={loading}/>
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
  text: {
    color: "#000000",
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "bold",
    marginHorizontal: 20,
  },
  date_style: {
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#BA9743",
    height: 54,
    borderRadius: 8,
    marginVertical: 5,
    marginHorizontal: 20,
    padding: 10,
  },
  date_picker: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: 320,
    height: 260,
    display: "flex",
  },
});
