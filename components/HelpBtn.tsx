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
import { Ionicons } from "@expo/vector-icons";

const HelpBtn = ({ navigation }) => {
  return (
    <>
      <TouchableOpacity style={styles.HelpBtn}>
        <View style={styles.Icon}>
          <Ionicons name="help" size={24} color="black" />
        </View>
        <Text
          style={{
            fontSize: 15,
            color: "#000",
            fontFamily: "sans-serif-medium",
            position: "absolute",
            left: 75,
          }}
        >
          Help
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

export default HelpBtn;

const styles = StyleSheet.create({
  HelpBtn: {
    width: Dimensions.get("window").width * 0.78,
    height: 50,
    backgroundColor: "#fff",
    position: "absolute",
    top: 230,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    elevation: 1.5,
    shadowColor: "skyblue",
  },
  Icon: {
    position: "absolute",
    top: 13,
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
