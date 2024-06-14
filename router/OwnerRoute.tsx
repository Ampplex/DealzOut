import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import LoginInfo_Context from "../context/LoginInfo/LoginInfo_Context";
import { Entypo } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import OwnerHome from "../owner_screens/OwnerHome";
import Report from "../owner_screens/Report";
import Profile from "../owner_screens/Profile";
import Marketing from "../owner_screens/Marketing";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const OwnerRoute = ({ navigation }) => {
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
    // fetchName();
  }, []);

  return (
    <>
      {screen == "Home" ? (
        <OwnerHome navigation={navigation} />
      ) : screen == "Report" ? (
        <Report />
      ) : screen == "Profile" ? (
        <Profile navigation={navigation} />
      ) : screen == "Marketing" ? (
        <Marketing />
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
            style={styles.Report}
            onPress={() => setScreen("Report")}
          >
            {screen == "Report" ? (
              <Entypo name="bar-graph" size={24} color="#fff" />
            ) : (
              <Entypo name="bar-graph" size={24} color="#fff" />
            )}
            <Text
              style={{
                color: "#fff",
                fontFamily: "sans-serif-medium",
                right: 8,
              }}
            >
              Report
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.Marketing}
            onPress={() => setScreen("Marketing")}
          >
            {screen == "Marketing" ? (
              <MaterialCommunityIcons name="sale" size={28} color="#fff" />
            ) : (
              <MaterialCommunityIcons name="sale" size={28} color="#fff" />
            )}
            <Text
              style={{
                color: "#fff",
                fontFamily: "sans-serif-medium",
                alignSelf: "center",
                right: 14,
              }}
            >
              Marketing
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

export default OwnerRoute;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  tabcontainer: {
    backgroundColor: "#5755FE",
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
  Marketing: {
    position: "absolute",
    right: 98,
  },
  History: {
    position: "absolute",
    left: 290,
  },
  userIcon: {
    width: 26,
    height: 26,
  },
  Report: {
    position: "absolute",
    left: 115,
  },
});
