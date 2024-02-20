import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import BookedTable from "../components/BookedTableBtn";
import HistoryBtn from "../components/HistoryBtn";
import FavoriteOrdersBtn from "../components/FavoriteOrdersBtn";
import HelpBtn from "../components/HelpBtn";

const Profile = ({ name, navigation }) => {
  return (
    <>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
        />
        <View style={styles.innerBody}>
          <View style={styles.drop}></View>
          <View style={styles.Bar1} />
          <View style={styles.Circle1} />
          <View style={styles.Bar2} />
          <View style={styles.Circle2} />

          {/* Profile Picture */}
          <View style={styles.profilePic}>
            {/* <Image
              style={{
                width: 110,
                height: 110,
                borderRadius: 100,
              }}
              source={{
                uri: "https://pics.craiyon.com/2023-06-14/a19461a2779545389938e6588c4e8a2c.webp",
              }}
            /> */}
            <View style={styles.defaultPic}>
              <Text
                style={{
                  fontSize: 40,
                  color: "#4A68FF",
                  fontFamily: "sans-serif-medium",
                  fontWeight: "bold",
                }}
              >
                A
              </Text>
            </View>
          </View>

          {/* UserName */}
          <Text style={styles.Name}>{name}</Text>

          <View style={styles.YourActivity}>
            <Text
              style={{
                fontSize: 17,
                color: "#000",
                fontFamily: "sans-serif-medium",
                position: "absolute",
                top: 20,
                left: 20,
                fontWeight: "bold",
              }}
            >
              Your Activities
            </Text>

            <BookedTable navigation={navigation} />
            <HistoryBtn navigation={navigation} />
            <FavoriteOrdersBtn navigation={navigation} />
            <HelpBtn navigation={navigation} />
          </View>

          <TouchableOpacity
            style={styles.logOut}
            onPress={() => navigation.navigate("Onboarding")}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#000",
                fontFamily: "sans-serif-medium",
              }}
            >
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Edit Button */}
      <TouchableOpacity style={styles.editButton}>
        <AntDesign name="edit" size={26} color="#000" />
      </TouchableOpacity>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("screen").height,
  },
  innerBody: {
    width: Dimensions.get("window").width - 20,
    height: Dimensions.get("window").height,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Dimensions.get("screen").height * 0.36,
    borderRadius: 20,
  },
  drop: {
    width: 150,
    height: 150,
    backgroundColor: "#fff",
    position: "absolute",
    top: -75,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },
  Bar1: {
    width: 140,
    height: 120,
    backgroundColor: "#fff",
    position: "absolute",
    top: -40,
    left: 32,
  },
  Circle1: {
    width: 120,
    height: 100,
    backgroundColor: "#F5F5F5",
    position: "absolute",
    top: -100,
    left: 5.5,
    borderBottomRightRadius: 200,
  },
  Bar2: {
    width: 140,
    height: 120,
    backgroundColor: "#fff",
    position: "absolute",
    top: -40,
    right: 32,
  },
  Circle2: {
    width: 120,
    height: 100,
    backgroundColor: "#F5F5F5",
    position: "absolute",
    top: -100,
    right: 5.5,
    borderBottomLeftRadius: 200,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 120,
    position: "absolute",
    top: -60,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    elevation: 12,
    backgroundColor: "#fff",
  },
  Name: {
    color: "#3E3E3E",
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "sans-serif-medium",
    position: "absolute",
    top: 75,
  },
  defaultPic: {
    width: 120,
    height: 120,
    borderRadius: 120,
    backgroundColor: "#D2E0FB",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  editButton: {
    width: 50,
    height: 50,
    position: "absolute",
    top: Dimensions.get("window").height * 0.073,
    right: Dimensions.get("window").width * 0.05,
  },
  YourActivity: {
    width: Dimensions.get("window").width * 0.82,
    height: Dimensions.get("window").height * 0.42,
    backgroundColor: "#fff",
    top: -Dimensions.get("window").height * 0.1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    elevation: 12,
    shadowColor: "skyblue",
  },
  logOut: {
    backgroundColor: "#fff",
    width: 120,
    height: 50,
    position: "absolute",
    bottom: 210,
    borderRadius: 10,
    elevation: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "skyblue",
  },
});
