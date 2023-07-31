import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import {
  FontAwesome as Icon,
  AntDesign,
  Ionicons,
  FontAwesome5,
} from "@expo/vector-icons";
import { TabBarButton } from "./app/components/TabBarButton";

import SignInScreen from "./app/screens/SignInScreen";
import SignUpScreen from "./app/screens/SignUpScreen";
import HomeScreen from "./app/screens/HomeScreen";
import ProfileScreen from "./app/screens/ProfileScreen";
import NotificationScreen from "./app/screens/NotificationScreen";
import ScheduleListScreen from "./app/screens/ScheduleListScreen";
import AddSchedulingScreen from "./app/screens/AddSchedulingScreen";
import ClientList from "./app/screens/ClientListScreen";
import AddClient from "./app/screens/AddClientScreen";
import ServiceList from "./app/screens/ServiceListScreen";
import AddService from "./app/screens/AddServiceScreen";
import PaymentList from "./app/screens/PaymentListScreen";
import InvoiceList from "./app/screens/InvoiceListScreen";
import AddInvoice from "./app/screens/AddInvoiceScreen";
import AddAppointment from "./app/screens/AddAppointmentScreen";
import SubscriptionPlanScreen from "./app/screens/SubscriptionPlanScreen";
import EditClient from "./app/screens/EditClientScreen";
import EditInvoice from "./app/screens/EditInvoiceScreen";
import ResetPassword from "./app/screens/ResetPasswordScreen";
import EditService from "./app/screens/EditServiceScreen";
import EditAppointment from "./app/screens/EditAppointmentScreen";

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  function HomeTabs() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#BA9743",
          tabBarInactiveTintColor: "#ffffff",
          tabBarStyle: {
            backgroundColor: "#000000",
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="home" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Scheduling"
          component={ScheduleListScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <AntDesign name="calendar" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="AddScheduling"
          component={AddAppointment}
          options={{
            tabBarButton: (props) => (
              <TabBarButton
                // bgColor={barColor}
                {...props}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Notification"
          component={NotificationScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="notifications" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="user" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="HomeTab" component={HomeTabs} />
        <Stack.Screen name="EditAppointment" component={EditAppointment} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="ClientList" component={ClientList} />
        <Stack.Screen name="AddClient" component={AddClient} />
        <Stack.Screen name="EditClient" component={EditClient} />
        <Stack.Screen name="ServiceList" component={ServiceList} />
        <Stack.Screen name="AddService" component={AddService} />
        <Stack.Screen name="EditService" component={EditService} />
        <Stack.Screen name="PaymentList" component={PaymentList} />
        <Stack.Screen name="InvoiceList" component={InvoiceList} />
        <Stack.Screen name="AddInvoice" component={AddInvoice} />
        <Stack.Screen name="EditInvoice" component={EditInvoice} />
        <Stack.Screen
          name="SubscriptionPlan"
          component={SubscriptionPlanScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigatorContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  navigator: {
    borderTopWidth: 0,
    backgroundColor: "transparent",
    elevation: 30,
  },
  xFillLine: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 34,
  },
});
