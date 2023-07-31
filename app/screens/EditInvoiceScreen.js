import React, { useEffect, useRef, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
} from "react-native";
import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import RBSheet from "react-native-raw-bottom-sheet";
import {
  SelectList,
  MultipleSelectList,
} from "react-native-dropdown-select-list";

import Button from "../components/Button";
import Header from "../components/Header";
import Input from "../components/Input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import {
  ADD_INVOICE,
  GET_CLIENT_LIST,
  GET_INVOICE_BY_ID,
  GET_SERVICE_LIST,
  INVOICE_BASE_URL,
} from "../utils/config";
import axios from "axios";
import DateTimePicker from "@react-native-community/datetimepicker";

import InputWithHeight from "../components/InputWithHeight";

const height = Dimensions.get("window").height / 7;

export default function EditInvoice({ navigation, route }) {
  const invoice_id = route.params.id;
  var randomNumber = Math.floor(1000 + Math.random() * 9000);

  const [image, setImage] = useState(null);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [message, setMessage] = useState("");
  // const [clientList, setClientList] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [statusList, setStatusList] = useState([
    { key: "pending", value: "Pending" },
    { key: "paid", value: "Paid" },
    { key: "cancel", value: "Cancel" },
  ]);
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [headingIcon, setHeadingIcon] = useState(true);
  const [defaultClient, setDefaultClient] = useState({});
  const [defaultService, setDefaultService] = useState({});
  const [defaultStatus, setDefaultStatus] = useState({});
  var clientList = [];
  var selectedService = {
    name: "",
    description: "",
    amount: "",
    start_time: "",
    end_time: "",
    service_date: "",
    user_id: "",
    feature_image: "",
  };
  useEffect(() => {
    getData().then((response) => {
      setUserId(response._id);
      getServicesList(response._id);
      getClientsList(response._id);
    });
    getInvoiceData(invoice_id);
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
  const getClientsList = async (value) => {
    setLoading(true);
    var object = {
      user_id: value,
    };
    await axios
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
          // setClientList(clientArray);
          clientList = clientArray;
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
  const getServicesList = async (value) => {
    setLoading(true);
    await axios
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
  const getInvoiceData = (value) => {
    setLoading(true);
    axios
      .get(GET_INVOICE_BY_ID + "/" + value)
      .then(function (response) {
        if (response.data.error) {
          setLoading(false);
          Toast.show({
            type: "error",
            text1: "Error",
            text2: response.data.error_msg,
          });
        } else {
          setInvoiceNumber(response.data.invoice.invoice_number);
          setTotalAmount(response.data.invoice.amount);
          setMessage(response.data.invoice.message);
          setData(response.data.invoice.services);
          // setDefaultStatus(serviceList[0])
          for (var i = 0; i < statusList.length; i++) {
            if (response.data.invoice.status === statusList[i].key) {
              setDefaultStatus(statusList[i]);
            }
          }
          for (var i = 0; i < clientList.length; i++) {
            if (response.data.invoice.client_id === clientList[i].key) {
              setDefaultClient(clientList[i]);
            }
          }

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
  function onDateSelected(event, value) {
    setDate(value);
    setDatePicker(false);
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const addServiceIntoList = () => {
    if (selectedService._id !== "") {
      var obj = {};
      var array = data;
      var foundIndex = data.findIndex(
        (item) => item._id === selectedService._id
      );
      if (data.length === 0) {
        obj = {
          _id: selectedService._id,
          name: selectedService.name,
          description: selectedService.description,
          amount: selectedService.amount,
          start_time: selectedService.start_time,
          end_time: selectedService.end_time,
          service_date: selectedService.service_date,
          user_id: selectedService.user_id,
          feature_image: selectedService.feature_image,
        };
        array = [...array, obj];
        setData(array);
        setTotalAmount(selectedService.amount);
      } else if (foundIndex === -1) {
        obj = {
          _id: selectedService._id,
          name: selectedService.name,
          description: selectedService.description,
          amount: selectedService.amount,
          start_time: selectedService.start_time,
          end_time: selectedService.end_time,
          service_date: selectedService.service_date,
          user_id: selectedService.user_id,
          feature_image: selectedService.feature_image,
        };
        array = [...array, obj];
        setData(array);
        var total_amount = 0;
        for (var j = 0; j < array.length; j++) {
          total_amount += array[j].amount;
        }
        setTotalAmount(total_amount);
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Already Existed",
        });
      }
    }
  };
  const handleRemoveFields = (id) => {
    const arr = [...data];
    arr.splice(
      arr.findIndex((value) => value._id === id),
      1
    );
    setData(arr);
    var total_amount = 0;
    for (var j = 0; j < arr.length; j++) {
      total_amount += arr[j].amount;
    }
    setTotalAmount(total_amount);
  };

  const validate = () => {
    var serviceIDArray = [];
    for (var i = 0; i < data.length; i++) {
      serviceIDArray.push(data[i]._id);
    }
    if (totalAmount <= 0) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Select at least one service",
      });
    } else {
      var invoiceObject = {
        due_date: date.toDateString(),
        amount: totalAmount,
        client_id: selectedClient,
        message: message,
        services: serviceIDArray,
        status: selectedStatus,
        invoice_number: invoiceNumber,
        user_id: userId,
      };
      editInvoice(invoiceObject);
    }
  };
  const editInvoice = (object) => {
    setLoading(true);
    axios
      .put(INVOICE_BASE_URL + invoice_id, object)
      .then(function (response) {
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
      });
  };
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Header
        heading={"Invoice"}
        icon={headingIcon}
        onPress={() => {
          setHeadingIcon(false);
        }}
      ></Header>
      <View style={styles.center_section}>
        {!headingIcon ? (
          <TouchableOpacity
            onPress={pickImage}
            style={styles.image_picker_style}
          >
            {image === null ? (
              <Feather name="image" size={24} color="black" />
            ) : (
              <Image
                source={{ uri: image }}
                style={styles.image_style}
                // style={styles.image_picker_style}
              />
            )}
          </TouchableOpacity>
        ) : null}

        <Text style={styles.text}>Invoice</Text>
        <Input
          placeholder={"Invoice Number"}
          value={invoiceNumber}
          onChangeText={setInvoiceNumber}
          editable={false}
        />
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
          defaultOption={defaultClient}
        />
        {!headingIcon ? (
          <>
            <Text style={styles.text}>Service</Text>
            <SelectList
              setSelected={(value) => {
                // setSelectedService(value);
                // data.push(value);
                selectedService = value;
                addServiceIntoList();
              }}
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
          </>
        ) : null}
        <Text style={styles.text}>Due Date</Text>
        <TouchableOpacity style={styles.date_style} onPress={showDatePicker}>
          <Text>{date.toDateString()}</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Status</Text>
        <SelectList
          setSelected={(value) => {
            setSelectedStatus(value);
          }}
          data={statusList}
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
          defaultOption={defaultStatus}
        />
        {message.length !== 0 ? (
          <>
            <Text style={styles.text}>Message</Text>
            <InputWithHeight
              placeholder={"Write Your Message"}
              value={message}
              onChangeText={setMessage}
              editable={false}
            />
          </>
        ) : null}
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
        {data?.map((item) => (
          <TouchableOpacity
            style={styles.item}
            //   onPress={() => {
            //     navigation.navigate("Subject", {
            //       id: item.id,
            //     });
            //   }}
            key={item._id}
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
              {/* <Text style={styles.availability_days_text}>
                {item.available_days}
              </Text>
              <Text style={styles.availability_time_text}>
                {item.start_time + " - " + item.end_time}
              </Text> */}
            </View>
            <View style={styles.third_section}>
              <Text style={styles.price_text}>
                {"$"}
                {item.amount}
              </Text>
              <TouchableOpacity
                style={{
                  height: 32,
                  width: 32,
                  borderRadius: 16,
                  backgroundColor: "#000000CC",
                  marginVertical: 5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => handleRemoveFields(item._id)}
              >
                <AntDesign name="delete" size={18} color="#FFD66B" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            paddingHorizontal: 20,
            paddingVertical: 15,
          }}
        >
          <Text
            style={{ fontWeight: "500", fontSize: 18, marginHorizontal: 10 }}
          >
            Total Amount
          </Text>
          <Text>-</Text>
          <Text
            style={{ fontWeight: "bold", fontSize: 18, marginHorizontal: 10 }}
          >
            ${totalAmount}
          </Text>
        </View>
        {!headingIcon ? (
          <Button title={"Update Invoice"} onPress={validate} loading={loading}/>
        ) : null}
      </View>
      <Toast />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginTop: StatusBar.currentHeight,
    // justifyContent: "center",
  },
  center_section: {
    marginHorizontal: 10,
  },
  text: {
    color: "#000000",
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "300",
    marginHorizontal: 20,
  },
  image_picker_style: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: "#cdcdcd",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 20,
  },
  image_style: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  add_service_section: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginHorizontal: 20,
    marginVertical: 10,
  },
  add_button: {
    height: 40,
    width: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
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
