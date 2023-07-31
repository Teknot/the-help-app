import React, { useState, useEffect } from "react";
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
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Checkbox from "expo-checkbox";

import Button from "../components/Button";
import Header from "../components/Header";
import Input from "../components/Input";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

import { SERVICE_BASE_URL } from "../utils/config";

export default function EditService({ navigation, route }) {
  const service_id = route.params.id;
  const serviceObject = route.params.item;
  console.log("Service Object", serviceObject.feature_image);
  const [image, setImage] = useState(serviceObject.feature_image);
  const [base64, setBase64] = useState(null);
  const [name, setName] = useState(serviceObject.name);
  const [price, setPrice] = useState(serviceObject.amount.toString());
  const [description, setDescription] = useState(serviceObject.description);
  const [startTime, setStartTime] = useState(serviceObject.start_time);
  const [endTime, setEndTime] = useState(serviceObject.end_time);
  const [nameEdit, setNameEdit] = useState(false);
  const [priceEdit, setPriceEdit] = useState(false);
  const [descriptionEdit, setDescriptionEdit] = useState(false);
  const [startTimeEdit, setStartTimeEdit] = useState(false);
  const [endTimeEdit, setEndTimeEdit] = useState(false);

  const [isMondaySelected, setMondaySelected] = useState(false);
  const [isTuesdaySelected, setTuesdaySelected] = useState(false);
  const [isWednesdaySelected, setWednesdaySelected] = useState(false);
  const [isThursdaySelected, setThursdaySelected] = useState(false);
  const [isFridaySelected, setFridaySelected] = useState(false);
  const [isSaturdaySelected, setSaturdaySelected] = useState(false);
  const [isSundaySelected, setSundaySelected] = useState(false);
  const [headingIcon, setHeadingIcon] = useState(true);

  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData().then((response) => {
      setUserId(response._id);
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
      console.log(e.toString());
    }
  };
  const validate = () => {
    if (name === "" || name.length === 0) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please Enter Name",
      });
    } else if (price === "" || price.length === 0) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please Enter Price",
      });
    } else if (description === "" || description.length === 0) {
      console.log("world");
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please Enter Description",
      });
    } else if (startTime === "" || startTime.length === 0) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please Enter Start Time",
      });
    } else if (endTime === "" || endTime.length === 0) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please Enter End Time",
      });
    } else {
      var userObject = {
        name: name,
        image: base64,
        description: description,
        amount: price,
        start_time: startTime,
        end_time: endTime,
        service_date: "01/12/2023",
        user_id: userId,
      };
      updateService(userObject);
    }
  };

  const updateService = (object) => {
    setLoading(true);
    console.log(object);
    axios
      .put(SERVICE_BASE_URL+"/"+service_id, object)
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
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 0.5,
      base64: true,
    });

    console.log(result.assets[0].uri);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setBase64("data:image/jpeg;base64," + result.assets[0].base64);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Header
        heading={"Edit Service"}
        icon={headingIcon}
        onPress={() => {
          setNameEdit(true);
          setPriceEdit(true);
          setDescriptionEdit(true);
          setStartTimeEdit(true);
          setEndTimeEdit(true);
          setHeadingIcon(false);
        }}
      ></Header>
      <View style={styles.center_section}>
        <TouchableOpacity onPress={pickImage} style={styles.image_picker_style}>
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

        <Text style={styles.text}>Name</Text>
        <Input
          placeholder={"Name"}
          value={name}
          onChangeText={setName}
          editable={nameEdit}
        />
        <Text style={styles.text}>Price</Text>
        <Input
          placeholder={"Price"}
          value={price}
          onChangeText={setPrice}
          editable={priceEdit}
        />
        <Text style={styles.text}>Description</Text>
        <Input
          placeholder={"Description"}
          value={description}
          onChangeText={setDescription}
          editable={descriptionEdit}
        />
        <Text style={styles.text}>Availability Hours</Text>
        <View style={styles.time_section}>
          {/* <TouchableOpacity style={styles.time_picker_style}>
            <Text>{"09:00 AM"}</Text>
          </TouchableOpacity> */}
          <TextInput
            placeholder={"Start Time"}
            value={startTime}
            onChangeText={setStartTime}
            style={styles.input}
            editable={startTimeEdit}
          />

          <Text style={styles.text}>-</Text>
          <TextInput
            placeholder={"End Time"}
            value={endTime}
            onChangeText={setEndTime}
            style={styles.input}
            editable={endTimeEdit}
          />

          {/* <TouchableOpacity style={styles.time_picker_style}>
            <Text>{"09:00 AM"}</Text>
          </TouchableOpacity> */}
        </View>
        <Text style={styles.text}>Availability Days</Text>
        <View style={styles.checkbox_style}>
          <Checkbox
            value={isMondaySelected}
            onValueChange={setMondaySelected}
            // style={styles.checkbox}
            color={isMondaySelected ? "#BA97435C" : undefined}
          />
          <Text style={styles.day_text}>Monday</Text>
        </View>
        <View style={styles.checkbox_style}>
          <Checkbox
            value={isTuesdaySelected}
            onValueChange={setTuesdaySelected}
            // style={styles.checkbox}
            color={isTuesdaySelected ? "#BA97435C" : undefined}
          />
          <Text style={styles.day_text}>Tuesday</Text>
        </View>
        <View style={styles.checkbox_style}>
          <Checkbox
            value={isWednesdaySelected}
            onValueChange={setWednesdaySelected}
            // style={styles.checkbox}
            color={isWednesdaySelected ? "#BA97435C" : undefined}
          />
          <Text style={styles.day_text}>Wednesday</Text>
        </View>
        <View style={styles.checkbox_style}>
          <Checkbox
            value={isThursdaySelected}
            onValueChange={setThursdaySelected}
            // style={styles.checkbox}
            color={isThursdaySelected ? "#BA97435C" : undefined}
          />
          <Text style={styles.day_text}>Thursday</Text>
        </View>
        <View style={styles.checkbox_style}>
          <Checkbox
            value={isFridaySelected}
            onValueChange={setFridaySelected}
            // style={styles.checkbox}
            color={isFridaySelected ? "#BA97435C" : undefined}
          />
          <Text style={styles.day_text}>Friday</Text>
        </View>
        <View style={styles.checkbox_style}>
          <Checkbox
            value={isSaturdaySelected}
            onValueChange={setSaturdaySelected}
            // style={styles.checkbox}
            color={isSaturdaySelected ? "#BA97435C" : undefined}
          />
          <Text style={styles.day_text}>Saturday</Text>
        </View>
        <View style={styles.checkbox_style}>
          <Checkbox
            value={isSundaySelected}
            onValueChange={setSundaySelected}
            // style={styles.checkbox}
            color={isSundaySelected ? "#BA97435C" : undefined}
          />
          <Text style={styles.day_text}>Sunday</Text>
        </View>
        {!headingIcon ? (
          <Button title={"Edit Service"} onPress={validate} loading={loading}/>
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
  time_picker_style: {
    justifyContent: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#BA9743",
    height: 54,
    borderRadius: 8,
    marginVertical: 2.5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  time_section: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 5,
  },
  checkbox_style: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#BA9743",
    height: 54,
    borderRadius: 8,
    marginVertical: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 20,
  },
  day_text: {
    fontSize: 14,
    marginHorizontal: 10,
  },
  input: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#BA9743",
    height: 54,
    width: 150,
    borderRadius: 8,
    marginVertical: 5,
    padding: 10,
  },
});
