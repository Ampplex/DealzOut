import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import queryString from "query-string";
import { showMessage } from "react-native-flash-message";
import { RegisterDataUser } from "../../abstraction/authentication";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const registerBtnHandler = async (
    email: string,
    password: string,
    first_name: string,
    last_name: string
  ) => {
    const apiUrl: string = "https://dealzout.onrender.com/api/users/";

    // Create form data
    const data: RegisterDataUser = {
      email: email,
      password: password,
      first_name: first_name,
      last_name: last_name,
    };

    // Serialize data to x-www-form-urlencoded format
    const formDataString = queryString.stringify(data);
    console.log(formDataString);

    // Making a POST request to register a new account
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
        return response.json();
      })
      .then((data) => {
        console.log("POST request successful:", data);
        if (data.msg == "User created successfully") {
          showMessage({
            message: "Registered successfully!",
            type: "success",
            duration: 1500,
            floating: true, // This allows the message to be displayed even if the user scrolls
            icon: "success",
          });
          navigation.navigate("Login");
        } else {
          showMessage({
            message: "Some error occurred",
            type: "danger",
            duration: 1500,
            floating: true, // This allows the message to be displayed even if the user scrolls
            icon: "danger",
          });
        }
      })
      .catch((error) => {
        console.error("Error during POST request:", error);
        showMessage({
          message: "All fields are required",
          type: "danger",
          duration: 1500,
          floating: true, // This allows the message to be displayed even if the user scrolls
          icon: "danger",
        });
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
            source={require("../../assets/animations/login.json")} // Replace with the path to your animation JSON file
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
            Register
          </Text>
        </View>
        {/* User details */}

        {/* First Name */}
        <View style={styles.firstName}>
          <TextInput
            style={styles.InputStyle}
            placeholder="First Name"
            onChangeText={(text: string) => setFirstName(text.trim())}
          />
        </View>

        {/* Last Name */}
        <View style={styles.lastName}>
          <TextInput
            style={styles.InputStyle}
            placeholder="Last Name"
            onChangeText={(text: string) => setLastName(text.trim())}
          />
        </View>

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
        </View>

        {/* Login Button */}
        <TouchableOpacity
          style={styles.Login_btn}
          onPress={() => {
            registerBtnHandler(email, password, firstName, lastName);
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
            Register
          </Text>
        </TouchableOpacity>
        <View
          style={{
            top: 20,
          }}
        />
      </ScrollView>
    </>
  );
};

export default Register;

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
    width: Dimensions.get("screen").width,
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
    left: -17,
    borderRadius: 20,
    borderColor: "#6A4E90",
    borderWidth: 2.2,
    marginTop: 20,
  },
  Password: {
    width: 280,
    height: 47,
    backgroundColor: "#fff",
    left: -17,
    borderRadius: 20,
    borderColor: "#6A4E90",
    borderWidth: 2.2,
    marginTop: 20,
  },
  firstName: {
    width: 280,
    height: 47,
    backgroundColor: "#fff",
    left: -17,
    borderRadius: 20,
    borderColor: "#6A4E90",
    borderWidth: 2.2,
    marginTop: 280,
  },
  lastName: {
    width: 280,
    height: 47,
    backgroundColor: "#fff",
    left: -17,
    borderRadius: 20,
    borderColor: "#6A4E90",
    borderWidth: 2.2,
    marginTop: 20,
  },
  InputStyle: {
    width: 280,
    height: 47,
    padding: 10,
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
});
