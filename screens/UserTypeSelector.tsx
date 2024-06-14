import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import { StatusBar } from "expo-status-bar";

const UserTypeSelector = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      {/* Food Animation */}

      <View style={styles.authenticationAnimation}>
        <LottieView
          autoPlay={true}
          style={styles.animationStyle}
          source={require("../assets/animations/food_onboarding.json")} // Replace with the path to your animation JSON file
        />
      </View>

      {/* Welcome message */}
      <View style={styles.message}>
        <Text
          style={{
            fontFamily: "sans-serif-medium",
            fontSize: 35,
            fontWeight: "bold",
            color: "#353535",
          }}
        >
          I'm a
        </Text>
      </View>

      {/* Login Button */}
      <TouchableOpacity
        style={styles.Login_btn}
        onPress={() => navigation.replace("Route")}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 17,
            fontFamily: "sans-serif-medium",
          }}
        >
          User
        </Text>
      </TouchableOpacity>

      {/* Sign Up */}
      <TouchableOpacity
        style={styles.Sign_Up}
        onPress={() => navigation.navigate("OwnerRoute")}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 17,
            fontFamily: "sans-serif-medium",
          }}
        >
          Restaurant owner
        </Text>
      </TouchableOpacity>

      {/* <Button title="Sign in with Google" onPress={() => promptAsync()} /> */}
    </View>
  );
};

export default UserTypeSelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  animationStyle: {
    width: Dimensions.get("window").width,
    height: 250,
  },
  authenticationAnimation: {
    position: "absolute",
    top: 25,
  },
  message: {
    alignSelf: "center",
  },
  Login_btn: {
    width: 220,
    height: 45,
    backgroundColor: "#000",
    position: "absolute",
    top: Dimensions.get("window").height * 0.63,
    justifyContent: "center",
    alignItems: "center",
    // borderRadius: 20,
    // elevation: 12,
  },
  Sign_Up: {
    width: 220,
    height: 45,
    backgroundColor: "#000",
    position: "absolute",
    top: Dimensions.get("window").height * 0.73,
    justifyContent: "center",
    alignItems: "center",
  },
});
