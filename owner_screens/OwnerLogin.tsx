import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import queryString from "query-string";
import { showMessage } from "react-native-flash-message";
import { LoginData } from "../abstraction/authentication";
import { setItemAsync, deleteItemAsync } from "expo-secure-store";

const OwnerLogin = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginPressable, setLoginPressable] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  async function storeAuthToken(prefix_token: any, token: string) {
    try {
      await setItemAsync(prefix_token, token);
      console.log("Token stored successfully");
    } catch (error) {
      console.error("Error storing token:", error);
    }
  }

  // async function deleteAuthToken() {
  //   try {
  //     await deleteItemAsync("token");
  //   } catch (error) {
  //     console.error("Error retrieving token:", error);
  //     navigation.replace("Login");
  //   }
  // }

  // useEffect(() => {
  //   deleteAuthToken();
  // }, []);

  const loginBtnHandler = async (email: string, password: string) => {
    const apiUrl = "https://dealzout.onrender.com/api/owners/login";

    // Create form data
    const data: LoginData = {
      email: email,
      password: password,
    };

    // Serialize data to x-www-form-urlencoded format
    const formDataString = queryString.stringify(data);

    console.log(formDataString);

    // Making a POST request to login to an existing account
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        // Add any additional headers if needed
      },
      body: formDataString,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setLoginPressable(true);
        return response.json();
      })
      .then((data) => {
        console.log("POST request successful:", data);
        if (data.msg == "success") {
          showMessage({
            message: "Logined successfully!",
            type: "success",
            duration: 1500,
            floating: true, // This allows the message to be displayed even if the user scrolls
            icon: "success",
          });
          storeAuthToken("Owner_token", data.token);
          navigation.replace("OwnerRoute");
        } else {
          showMessage({
            message: "Invalid credentials",
            type: "danger",
            duration: 1500,
            floating: true, // This allows the message to be displayed even if the user scrolls
            icon: "danger",
          });
        }
      })
      .catch((error) => {
        console.error("Error during POST request:", error);
      });
  };

  return (
    <>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.LoginAnimation_Container}>
          <LottieView
            autoPlay={true}
            style={styles.animationStyle}
            source={require("../assets/animations/login.json")} // Replace with the path to your animation JSON file
          />
        </View>
        <View style={styles.welcomeMsg}>
          <Text
            style={{
              fontSize: 30,
              fontFamily: "sans-serif-medium",
              fontWeight: "bold",
              color: "#6A4E90",
            }}
          >
            Welcome back!
          </Text>
        </View>
        {/* User details */}

        {/* Email */}
        <View style={styles.Email}>
          <TextInput
            style={styles.InputStyle}
            placeholder="Email"
            onChangeText={(text: string) => setEmail(text.trim())}
          />
        </View>

        {/* Password */}
        <View style={styles.Password}>
          <TextInput
            style={styles.InputStyle}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text: string) => setPassword(text.trim())}
          />
          {/* <TouchableOpacity
            onPress={() => {
              setShowPassword(!showPassword);
              console.log(!showPassword);
            }} // Toggle password visibility
            style={styles.viewPasswordBtn}
          >
            {!showPassword ? (
              <Ionicons name="eye-outline" size={25} color="#908D88" />
            ) : (
              <Feather name="eye-off" size={24} color="#908D88" />
            )}
          </TouchableOpacity> */}
        </View>

        {/* Login Button */}
        <TouchableOpacity
          style={styles.Login_btn}
          disabled={!loginPressable}
          onPress={() => {
            setLoginPressable(false);
            loginBtnHandler(email, password);
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontFamily: "sans-serif-medium",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
        <View
          style={{
            top: 20,
          }}
        />
        <TouchableOpacity onPress={() => navigation.navigate("OwnerRegister")}>
          <Text
            style={{
              marginTop: 25,
              color: "#6A4E90",
              fontSize: 16,
              fontFamily: "sans-serif-medium",
            }}
          >
            Don't have an account? Register
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

export default OwnerLogin;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("screen").height,
  },
  LoginAnimation_Container: {
    width: 290,
    height: 290,
    position: "absolute",
    top: 0,
    alignItems: "center",
  },
  animationStyle: {
    width: 330,
    height: 330,
    alignSelf: "center",
  },
  welcomeMsg: {
    position: "absolute",
    left: 20,
    top: Dimensions.get("window").height * 0.43,
  },
  Email: {
    width: 280,
    height: 47,
    backgroundColor: "#fff",
    marginTop: 200,
    left: -17,
    borderRadius: 20,
    borderColor: "#6A4E90",
    borderWidth: 2.2,
  },
  Password: {
    width: 280,
    height: 47,
    backgroundColor: "#fff",
    marginTop: 20,
    left: -17,
    borderRadius: 20,
    borderColor: "#6A4E90",
    borderWidth: 2.2,
  },
  InputStyle: {
    width: 280,
    height: 47,
    padding: 10,
    borderRadius: 20,
  },
  Login_btn: {
    width: 160,
    height: 50,
    backgroundColor: "#6A4E90",
    marginTop: 40,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  viewPasswordBtn: {
    // backgroundColor: "green",
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    bottom: 27,
  },
});
