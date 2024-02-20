import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import HomeScreen from "../screens/Home";
import History from "../screens/History";
import { AntDesign } from "@expo/vector-icons";
import Profile from "../screens/Profile";
import Money from "../screens/Money";
import ViewOrder from "../screens/ViewOrder";
import Settings from "../screens/Settings";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import LoginInfo_Context from "../context/LoginInfo/LoginInfo_Context";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const Route = ({ navigation }) => {
  const [screen, setScreen] = useState<string>("Home");
  const { token } = useContext(LoginInfo_Context);
  const [name, setName] = useState<string>("");

  const getName = async () => {
    const url = `https://dealzout.onrender.com/api/users/getName/${token._id}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const dataResponse = await response.json();
      return dataResponse;
    } catch (error) {
      console.error("Error fetching data:", error);
      return "";
    }
  };

  const fetchName = async () => {
    const resp = await getName();
    setName(resp.Name);
  };

  useEffect(() => {
    fetchName();
  }, []);

  return (
    <>
      {screen == "Home" ? (
        <HomeScreen navigation={navigation} />
      ) : screen == "Cart" ? (
        <ViewOrder navigation={navigation} />
      ) : screen == "Profile" ? (
        <Profile name={name} navigation={navigation} />
      ) : screen == "Money" ? (
        <Money />
      ) : (
        <View />
      )}
      <StatusBar style="dark" />
      <View style={styles.tabcontainer}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity
            style={styles.Home}
            onPress={() => setScreen("Home")}
          >
            {screen == "Home" ? (
              <Entypo name="home" size={27} color="#fff" />
            ) : (
              <AntDesign name="home" size={27} color="#fff" />
            )}
            <Text
              style={{
                color: "#fff",
                fontFamily: "sans-serif-medium",
                right: 5,
              }}
            >
              Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.Cart}
            onPress={() => setScreen("Cart")}
          >
            {screen == "Cart" ? (
              <Ionicons name="cart" size={30} color="#fff" />
            ) : (
              <AntDesign name="shoppingcart" size={30} color="#fff" />
            )}
            <Text
              style={{
                color: "#fff",
                fontFamily: "sans-serif-medium",
                right: -3,
              }}
            >
              Cart
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.Money}
            onPress={() => setScreen("Money")}
          >
            {screen == "Money" ? (
              <FontAwesome5 name="credit-card" size={24} color="#fff" />
            ) : (
              <AntDesign name="creditcard" size={27} color="#fff" />
            )}
            <Text
              style={{
                color: "#fff",
                fontFamily: "sans-serif-medium",
                alignSelf: "center",
                right: 6,
              }}
            >
              Money
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.Profile}
            onPress={() => setScreen("Profile")}
          >
            {screen == "Profile" ? (
              <FontAwesome name="user" size={32} color="#fff" />
            ) : (
              <FontAwesome name="user-o" size={28} color="#fff" />
            )}
            <Text
              style={{
                color: "#fff",
                fontFamily: "sans-serif-medium",
                alignSelf: "center",
                right: 10,
              }}
            >
              Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Route;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  tabcontainer: {
    backgroundColor: "#5559CE",
    elevation: 12,
    width: "97%",
    height: 58,
    position: "absolute",
    bottom: 10,
    borderRadius: 30,
    alignSelf: "center",
  },
  Home: {
    position: "absolute",
    left: 40,
  },
  Profile: {
    position: "absolute",
    right: 30,
  },
  Money: {
    position: "absolute",
    right: 110,
  },
  History: {
    position: "absolute",
    left: 290,
  },
  userIcon: {
    width: 26,
    height: 26,
  },
  Cart: {
    position: "absolute",
    left: 115,
  },
});
