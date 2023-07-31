import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Image,
  StatusBar,
  ScrollView,
  ImageBackground,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "../components/Header";
import { LinearGradient } from "expo-linear-gradient";

const height = Dimensions.get("window").height / 3.5;
export default function SubscriptionPlanScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header heading={"Subscription"} />
      <Text style={styles.primary_heading}>Pricing Plan</Text>
      <Text style={styles.secondary_heading}>
        Start with 7 days free trial. Upgrade or downgrade anytime
      </Text>
      <ScrollView>
        {/** Start First Card */}
        <View style={styles.subscription_card}>
          <View style={styles.subscription_card_first_section}>
            <ImageBackground
              source={require("../assets/subscription_background.png")}
              style={styles.background_image}
            >
              <Image source={require("../assets/shape001.png")} />
              <Text
                style={{ fontSize: 16, marginVertical: 10, fontWeight: "400" }}
              >
                Emerging
              </Text>
            </ImageBackground>
          </View>
          <View style={styles.subscription_card_second_section}>
            <View
              style={{
                flexDirection: "row",
                alignSelf: "flex-start",
                marginLeft: 20,
              }}
            >
              <Text
                style={{ fontSize: 42, fontWeight: "bold", color: "#000000" }}
              >
                $14 /
              </Text>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "400",
                  color: "#000000",
                  alignSelf: "flex-end",
                  marginBottom: 10,
                }}
              >
                {" "}
                Month
              </Text>
            </View>
            <Text
              style={{
                alignSelf: "flex-start",
                marginLeft: 25,
                marginBottom: 20,
              }}
            >
              Save 6% Annually
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Image source={require("../assets/circle_arrow.png")}></Image>
              <Text ellipsizeMode="tail" numberOfLines={1}>
                Lorem ipsum dummy text
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Image source={require("../assets/circle_arrow.png")}></Image>
              <Text ellipsizeMode="tail" numberOfLines={1}>
                Lorem ipsum dummy text
              </Text>
            </View>
            <View
              style={{
                alignSelf: "flex-end",
                marginRight: 20,
                marginTop: 20,
                flexDirection: "row",
                // alignItems:"center",
                // justifyContent:"center"
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "500" }}>
                Choose Plan
              </Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="black"
              />
            </View>
          </View>
        </View>
        {/** End First Card */}

        {/** Start Second Card */}
        <LinearGradient
        //   style={{ ...styles.appButtonContainer }}
        style={styles.subscription_card}  
        colors={["#BA9743", "#FFD66B", "#BA9743"]}
          start={[0, 1]}
          end={[1, 0]}
        >
          {/* <View style={styles.subscription_card}> */}
            <View style={styles.subscription_card_first_section}>
              <ImageBackground
                source={require("../assets/subscription_background.png")}
                style={styles.background_image}
              >
                <Image source={require("../assets/shape001.png")} />
                <Text
                  style={{
                    fontSize: 16,
                    marginVertical: 10,
                    fontWeight: "400",
                  }}
                >
                  Growing
                </Text>
              </ImageBackground>
            </View>
            <View style={styles.subscription_card_second_section}>
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "flex-start",
                  marginLeft: 20,
                }}
              >
                <Text
                  style={{ fontSize: 42, fontWeight: "bold", color: "#000000" }}
                >
                  $23 /
                </Text>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "400",
                    color: "#000000",
                    alignSelf: "flex-end",
                    marginBottom: 10,
                  }}
                >
                  {" "}
                  Month
                </Text>
              </View>
              <Text
                style={{
                  alignSelf: "flex-start",
                  marginLeft: 25,
                  marginBottom: 20,
                }}
              >
                Save 8% Annually
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Image source={require("../assets/circle_arrow.png")}></Image>
                <Text ellipsizeMode="tail" numberOfLines={1}>
                  Lorem ipsum dummy text
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Image source={require("../assets/circle_arrow.png")}></Image>
                <Text ellipsizeMode="tail" numberOfLines={1}>
                  Lorem ipsum dummy text
                </Text>
              </View>
              <View
                style={{
                  alignSelf: "flex-end",
                  marginRight: 20,
                  marginTop: 20,
                  flexDirection: "row",
                  // alignItems:"center",
                  // justifyContent:"center"
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "500" }}>
                  Choose Plan
                </Text>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  color="black"
                />
              </View>
            </View>
          {/* </View> */}
        </LinearGradient>

        {/** End Second Card */}

        {/** Start Third card */}
        <View style={styles.subscription_card}>
          <View style={styles.subscription_card_first_section}>
            <ImageBackground
              source={require("../assets/subscription_background.png")}
              style={styles.background_image}
            >
              <Image source={require("../assets/shape001.png")} />
              <Text
                style={{
                  fontSize: 16,
                  marginVertical: 10,
                  fontWeight: "400",
                  textAlign: "center",
                }}
              >
                Power House
              </Text>
            </ImageBackground>
          </View>
          <View style={styles.subscription_card_second_section}>
            <View
              style={{
                flexDirection: "row",
                alignSelf: "flex-start",
                marginLeft: 20,
              }}
            >
              <Text
                style={{ fontSize: 42, fontWeight: "bold", color: "#000000" }}
              >
                $45 /
              </Text>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "400",
                  color: "#000000",
                  alignSelf: "flex-end",
                  marginBottom: 10,
                }}
              >
                {" "}
                Month
              </Text>
            </View>
            <Text
              style={{
                alignSelf: "flex-start",
                marginLeft: 25,
                marginBottom: 20,
              }}
            >
              Save 10% Annually
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Image source={require("../assets/circle_arrow.png")}></Image>
              <Text ellipsizeMode="tail" numberOfLines={1}>
                Lorem ipsum dummy text
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Image source={require("../assets/circle_arrow.png")}></Image>
              <Text ellipsizeMode="tail" numberOfLines={1}>
                Lorem ipsum dummy text
              </Text>
            </View>
            <View
              style={{
                alignSelf: "flex-end",
                marginRight: 20,
                marginTop: 20,
                flexDirection: "row",
                // alignItems:"center",
                // justifyContent:"center"
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "500" }}>
                Choose Plan
              </Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="black"
              />
            </View>
          </View>
        </View>
        {/** End Third Card */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginTop: StatusBar.currentHeight || 10,
    // justifyContent:"center",
    alignItems: "center",
  },
  primary_heading: {
    fontSize: 28,
    color: "#BA9743",
    fontWeight: "bold",
    marginVertical: 5,
  },
  secondary_heading: {
    fontSize: 16,
    color: "#000",
    fontWeight: "600",
    marginVertical: 5,
    textAlign: "center",
  },
  subscription_card: {
    flexDirection: "row",
    borderRadius: 15,
    backgroundColor: "#ffffff",
    elevation: 5,
    height: height,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  background_image: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  subscription_card_first_section: {
    width: "33%",
  },
  subscription_card_second_section: {
    width: "67%",
    justifyContent: "center",
    alignItems: "center",
  },
});
