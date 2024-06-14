import { StyleSheet, Text, View, Image, Animated } from "react-native";
import { getItemAsync } from "expo-secure-store";
import LoginInfo_Context from "../context/LoginInfo/LoginInfo_Context";
import RegistrationInfo_Context from "../context/OwnerRegistration/RegistrationInfo_Context";
import React, { useEffect, useContext, useState } from "react";
import { decode as atob } from "base-64";

const Splash = ({ navigation }) => {
  const opacity = new Animated.Value(0);
  const { token, setMyToken } = useContext(LoginInfo_Context);
  const { first_name, last_name, email, phoneNo, PanCardNo, setDetails } =
    useContext(RegistrationInfo_Context);
  const [userToken, setUserToken] = useState<string>("");
  const [ownerToken, setOwnerToken] = useState<any>("");

  function Token_Decoder(Token, type: string) {
    try {
      console.log(Token);
      if (!Token) {
        console.error("Token is empty");
        return;
      }

      const [header, payload, signature] = Token.split(".");
      // Decode the payload
      const decodedToken = JSON.parse(atob(payload));

      if (type === "user") {
        setUserToken(decodedToken);
      } else if (type === "owner") {
        setOwnerToken(decodedToken);
      } else {
        throw "Invalid user type";
      }
    } catch (error) {
      console.error("Error decoding User_token:", error);
    }
  }

  // Retrieve the authentication User_token
  async function getAuthToken() {
    try {
      const User_token = await getItemAsync("User_token");
      const Owner_token = await getItemAsync("Owner_token");
      if (User_token !== null) {
        console.log("Token retrieved successfully:", User_token);
        setUserToken(User_token);
      } else if (Owner_token !== null) {
        console.log("Token retrieved successfully:", Owner_token);
        setOwnerToken(Owner_token);
      } else {
        console.log("Token not found");
        navigation.replace("Onboarding");
      }
    } catch (error) {
      console.error("Error retrieving User_token:", error);
      navigation.replace("Onboarding");
    }
  }

  const Animation_Handler = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    Animation_Handler();
    setTimeout(() => {
      getAuthToken();
    }, 2000);
  }, []);

  useEffect(() => {
    // Run Token_Decoder when token2 changes

    if (userToken) {
      Token_Decoder(userToken, "user");
      console.log(userToken);
      // Navigate to the desired route
      navigation.replace("Route");
    } else if (ownerToken) {
      Token_Decoder(ownerToken, "owner");
      setDetails(
        ownerToken.firstName,
        ownerToken.lastName,
        ownerToken.email,
        ownerToken.phoneNumber,
        ownerToken.panNumber
      );
      // Navigate to the desired route
      navigation.replace("OwnerRoute");
    }
  }, [userToken, ownerToken]);

  return (
    <Animated.View
      style={{
        ...styles.container,
        opacity: opacity,
      }}
    >
      <Image style={styles.logo} source={require("../assets/Splash.jpg")} />
    </Animated.View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEEB5D",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 400,
    height: 400,
    left: 0,
  },
});
