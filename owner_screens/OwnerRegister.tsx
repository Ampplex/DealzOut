import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TextInput,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import queryString from "query-string";
import { showMessage } from "react-native-flash-message";
import { RegisterDataOwner } from "../abstraction/authentication";
import RegistrationInfo_Context from "../context/OwnerRegistration/RegistrationInfo_Context";
import UserLocation_context from "../context/Cache/UserLocation_context";

const OwnerRegister = ({ navigation }) => {
  const { userLocation, address } = useContext(UserLocation_context);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNo, setPhoneNo] = useState<string>("");
  const [PanCardNo, setPanCardNo] = useState<string>("");
  const { setDetails } = useContext(RegistrationInfo_Context);
  const addressArray = address.split(",");
  const region = addressArray[0];
  const city = addressArray[1];
  const state = addressArray[2];
  const zip = addressArray[3];
  const country = addressArray[4];
  const coordinates = [
    userLocation.coords.latitude,
    userLocation.coords.longitude,
  ];

  useEffect(() => {
    console.log(country);
    console.log(userLocation.coords.longitude);
  }, []);

  const registerBtnHandler = async () => {
    const apiUrl = "https://dealzout.onrender.com/api/owners";

    // Create form data
    const data: RegisterDataOwner = {
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: email.trim(),
      password: password.trim(),
      phoneNumber: phoneNo.trim(),
      panNumber: PanCardNo.trim(),
      country: country.trim(),
      state: state.trim(),
      city: city.trim(),
      region: region.trim(),
      coordinates: coordinates.toString(),
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
        return response.json();
      })
      .then((data) => {
        console.log("POST request successful:", data);
        if (data.msg == "success") {
          showMessage({
            message: "Registered successfully!",
            type: "success",
            duration: 1500,
            floating: true, // This allows the message to be displayed even if the user scrolls
            icon: "success",
          });
          navigation.replace("OwnerLogin");
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

        {/* Phone No. */}
        <View style={styles.PhoneNo}>
          <TextInput
            style={styles.InputStyle}
            placeholder="Enter your Phone Number"
            onChangeText={(text: string) => setPhoneNo(text.trim())}
          />
        </View>

        <View style={styles.PanCard}>
          <TextInput
            style={styles.InputStyle}
            placeholder="Enter your PAN Number"
            onChangeText={(text: string) => setPanCardNo(text.trim())}
          />
        </View>

        {/* Proceed Button */}
        <TouchableOpacity
          style={styles.Proceed_btn}
          onPress={() => registerBtnHandler()}
        >
          <Text
            style={{
              color: "#fff",
              fontFamily: "sans-serif-medium",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            Proceed
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

export default OwnerRegister;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("screen").height * 1.1,
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
    marginTop: 350,
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
  Proceed_btn: {
    width: 160,
    height: 50,
    backgroundColor: "#6A4E90",
    marginTop: 40,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  PhoneNo: {
    width: 280,
    height: 47,
    backgroundColor: "#fff",
    left: -17,
    borderRadius: 20,
    borderColor: "#6A4E90",
    borderWidth: 2.2,
    marginTop: 20,
  },
  PanCard: {
    width: 280,
    height: 47,
    backgroundColor: "#fff",
    left: -17,
    borderRadius: 20,
    borderColor: "#6A4E90",
    borderWidth: 2.2,
    marginTop: 20,
  },
});
