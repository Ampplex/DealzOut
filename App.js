import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Easing, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import Splash from "./screens/Splash";
import Login from "./screens/Auth/Login";
import Register from "./screens/Auth/Register";
import FlashMessage from "react-native-flash-message";
import Home from "./screens/Home";
import Route from "./router/Route";
import OwnerRoute from "./router/OwnerRoute";
import Settings from "./screens/Settings";
import LoginInfo_State from "./context/LoginInfo/LoginInfo_State";
import Currency_State from "./context/LoginInfo/Currency_State";
import UserLocation_State from "./context/Cache/UserLocation_State";
import Order from "./screens/Order";
import ViewOrder from "./screens/ViewOrder";
import Onboarding from "./screens/Onboarding";
import Search from "./screens/Search";
import OwnerLogin from "./owner_screens/OwnerLogin";
import OwnerRegister from "./owner_screens/OwnerRegister";
import RegistrationInfo_State from "./context/OwnerRegistration/RegistrationInfo_State";
import Offers from "./screens/Offers";
import OwnerHome from "./owner_screens/OwnerHome";
import Restaurant from "./owner_screens/Add/Restaurant";

export default function App() {
  const config = {
    animation: "spring",
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

  const closeConfig = {
    animation: "timing",
    config: {
      duration: 300,
      easing: Easing.linear,
    },
  };

  const Stack = createStackNavigator();

  return (
    <>
      <RegistrationInfo_State>
        <LoginInfo_State>
          <Currency_State>
            <UserLocation_State>
              <StatusBar style="auto" />
              <NavigationContainer>
                <Stack.Navigator
                  screenOptions={{
                    headerTitleAlign: "center",
                    gestureEnabled: true,
                    gestureDirection: "horizontal",
                    cardStyleInterpolator:
                      CardStyleInterpolators.forHorizontalIOS,
                    transitionSpec: {
                      open: config,
                      close: closeConfig,
                      headerMode: "float",
                    },
                  }}
                  animation="fade"
                >
                  <Stack.Screen
                    name="Splash"
                    component={Splash}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="Onboarding"
                    component={Onboarding}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="Route"
                    component={Route}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="Settings"
                    component={Settings}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="Order"
                    component={Order}
                    options={{
                      headerShown: true,
                    }}
                  />
                  <Stack.Screen
                    name="ViewOrder"
                    component={ViewOrder}
                    options={{
                      headerShown: true,
                    }}
                  />
                  <Stack.Screen
                    name="Search"
                    component={Search}
                    options={{
                      headerShown: false,
                    }}
                  />

                  <Stack.Screen
                    name="OwnerLogin"
                    component={OwnerLogin}
                    options={{
                      headerShown: false,
                    }}
                  />

                  <Stack.Screen
                    name="OwnerRegister"
                    component={OwnerRegister}
                    options={{
                      headerShown: false,
                    }}
                  />

                  <Stack.Screen
                    name="Offers"
                    component={Offers}
                    options={{
                      headerShown: true,
                    }}
                  />

                  <Stack.Screen
                    name="OwnerHome"
                    component={OwnerHome}
                    options={{
                      headerShown: false,
                    }}
                  />

                  <Stack.Screen
                    name="OwnerRoute"
                    component={OwnerRoute}
                    options={{
                      headerShown: false,
                    }}
                  />

                  <Stack.Screen
                    name="Restaurant"
                    component={Restaurant}
                    options={{
                      headerShown: true,
                      headerTitle: "Add Restaurant",
                    }}
                  />
                </Stack.Navigator>
              </NavigationContainer>
              <FlashMessage position={"bottom"} />
            </UserLocation_State>
          </Currency_State>
        </LoginInfo_State>
      </RegistrationInfo_State>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
