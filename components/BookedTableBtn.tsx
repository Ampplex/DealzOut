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
import { Ionicons } from "@expo/vector-icons";

const BookedTableBtn = ({ navigation }) => {
  return (
    <>
      <TouchableOpacity style={styles.BookedTable}>
        <Image
          source={require("../assets/dining-table.png")}
          style={styles.Icon}
        />

        <Text
          style={{
            fontSize: 15,
            color: "#000",
            fontFamily: "sans-serif-medium",
            position: "absolute",
            left: 75,
          }}
        >
          Your Booked tables
        </Text>

        <View style={styles.separator} />

        <View
          style={{
            position: "absolute",
            right: 12,
            justifyContent: "center",
          }}
        >
          <Ionicons name="chevron-forward" size={24} color="#000" />
        </View>
      </TouchableOpacity>
    </>
  );
};

export default BookedTableBtn;

const styles = StyleSheet.create({
  BookedTable: {
    width: Dimensions.get("window").width * 0.78,
    height: 50,
    backgroundColor: "#fff",
    position: "absolute",
    top: 65,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    elevation: 1.5,
    shadowColor: "skyblue",
  },
  Icon: {
    width: 40,
    height: 40,
    position: "absolute",
    top: 5,
    left: 15,
  },
  separator: {
    width: 1.8,
    height: 35,
    backgroundColor: "#DAF4FF",
    position: "absolute",
    borderRadius: 100,
    right: 40,
  },
});
