import { StyleSheet } from "react-native";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import UserLocation_context from "../context/Cache/UserLocation_context";
import LoginInfo_Context from "../context/LoginInfo/LoginInfo_Context";
import { Fontisto } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

const OwnerHome = ({ navigation }) => {
  const { userLocation, address } = useContext(UserLocation_context);
  const { token } = useContext(LoginInfo_Context);
  const [name, setName] = useState<string>("");

  // Following animation values are for Business Report Container
  const BusinessReportElevation = new Animated.Value(0);
  const BusinessReportRadius = new Animated.Value(0);

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
    // console.log(name[0);
  };

  useEffect(() => {
    Animated.timing(BusinessReportElevation, {
      toValue: 20,
      duration: 1200,
      useNativeDriver: false,
    }).start();

    Animated.timing(BusinessReportRadius, {
      toValue: 20,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <>
      <StatusBar backgroundColor={"white"} />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={{
            ...styles.BusinessReport,
            elevation: BusinessReportElevation,
            borderRadius: BusinessReportRadius,
          }}
        >
          <LinearGradient
            colors={["#5755FE", "#A497DD"]}
            start={{ x: 0.4, y: 0.46 }}
            style={{
              width: "100%",
              height: Dimensions.get("screen").height * 0.25,
              position: "absolute",
              top: 0,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontFamily: "sans-serif-medium",
                fontSize: 20,
                color: "#fff",
                textAlign: "center",
                fontWeight: "bold",
                top: 20,
                left: 12,
                position: "absolute",
                paddingLeft: 10,
              }}
            >
              Business Report
            </Text>
            <Text style={styles.todaySales}>Today's Sales</Text>
            <Text style={styles.sales}>₹2600</Text>
            <Text style={styles.monthlySale}>This month ₹80000</Text>
          </LinearGradient>
        </Animated.View>

        <Text
          style={{
            fontFamily: "sans-serif-medium",
            fontSize: 23,
            color: "#000",
            textAlign: "center",
            position: "absolute",
            left: Dimensions.get("screen").width * 0.06,
            top: Dimensions.get("screen").height * 0.44,
          }}
        >
          Quick links
        </Text>

        <TouchableOpacity style={styles.Menu}>
          <MaterialIcons name="restaurant-menu" size={27} color="#5755FE" />
          <Text
            style={{
              top: 3,
            }}
          >
            Menu
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.AddOffer}>
          <MaterialIcons name="local-offer" size={24} color="#5755FE" />
          <Text
            style={{
              top: 5,
              fontSize: 14,
            }}
          >
            Add Offers
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Bookings}>
          <Fontisto name="date" size={23} color="#5755FE" />
          <Text
            style={{
              top: 7,
            }}
          >
            Bookings
          </Text>
        </TouchableOpacity>

        <View style={styles.NoRestaurantAdded}>
          <Text
            style={{
              fontSize: 17,
              top: -50,
              fontFamily: "sans-serif-medium",
              fontWeight: "bold",
            }}
          >
            You haven't added any restaurant yet,
          </Text>
          <Text
            style={{
              fontSize: 17,
              top: -50,
              fontFamily: "sans-serif-medium",
              fontWeight: "bold",
            }}
          >
            Get started by adding one!
          </Text>

          {/* Navigating to Add restaurant screen when the user presses the following button */}
          <TouchableOpacity
            style={styles.AddRestBtn}
            onPress={() => navigation.navigate("Restaurant")}
          >
            <LottieView
              source={require("../assets/animations/addBtn.json")}
              autoPlay
              loop
              style={{
                width: 55,
                height: 55,
              }}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Header component */}

      <View style={styles.Header}>
        <MaterialIcons
          style={{ marginTop: 22, left: 10 }}
          name="location-pin"
          size={30}
          color="#5755FE"
        />
        <Text numberOfLines={1} style={styles.Address}>{`${
          address || "Fetching address..."
        }`}</Text>
        <TouchableOpacity onPress={() => console.log("Notification")}>
          <Ionicons
            name="notifications-outline"
            size={25}
            color="#5755FE"
            style={{ position: "absolute", right: 30, top: -25 }}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default OwnerHome;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    minHeight: Dimensions.get("screen").height * 1.05,
  },
  Header: {
    width: Dimensions.get("screen").width,
    height: 100,
    backgroundColor: "#FFF",
    position: "absolute",
    top: 0,
    justifyContent: "center",
    elevation: 2,
  },
  Address: {
    position: "absolute",
    left: 40,
    paddingRight: 120,
    fontSize: 14,
    top: 52,
    fontFamily: "sans-serif-medium",
    color: "#000",
  },
  SearchBar: {
    position: "absolute",
    top: Dimensions.get("window").height * 0.17,
    backgroundColor: "#fff",
    width: Dimensions.get("screen").width * 0.95,
    height: 50,
    borderRadius: 10,
    elevation: 20,
    shadowColor: "grey",
  },
  offerBannerContainer: {
    marginTop: -Dimensions.get("window").height * 0.24,
  },
  OrderOptionseparator: {
    backgroundColor: "#E7E7E7",
    position: "absolute",
    top: Dimensions.get("window").height * 0.6,
    width: 320,
    height: 1.5,
  },
  OrderTitle: {
    backgroundColor: "#fff",
    width: 120,
    height: 40,
    alignSelf: "center",
    bottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  viewOrder: {
    backgroundColor: "#fff",
    position: "absolute",
    width: 100,
    height: 100,
    top: Dimensions.get("window").height * 0.67,
    borderRadius: 20,
    right: 18,
    elevation: 1,
    shadowColor: "grey",
  },
  Order: {
    backgroundColor: "#fff",
    position: "absolute",
    width: 100,
    height: 100,
    top: Dimensions.get("window").height * 0.67,
    borderRadius: 20,
    left: 125,
    justifyContent: "center",
    alignItems: "center",
    elevation: 1,
    shadowColor: "grey",
  },
  Offers: {
    backgroundColor: "#fff",
    position: "absolute",
    width: 100,
    height: 100,
    top: Dimensions.get("window").height * 0.67,
    borderRadius: 20,
    left: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 1,
    shadowColor: "grey",
  },
  title: {
    position: "absolute",
    left: 10,
  },
  BusinessReport: {
    backgroundColor: "#fff",
    position: "absolute",
    width: Dimensions.get("screen").width * 0.94,
    height: Dimensions.get("screen").height * 0.25,

    elevation: 12,
    shadowColor: "#000",
    top: Dimensions.get("window").height * 0.17,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  todaySales: {
    position: "absolute",
    color: "#fff",
    fontFamily: "sans-serif-medium",
    fontSize: 19,
    top: 60,
    left: 20,
  },
  sales: {
    position: "absolute",
    color: "#fff",
    fontFamily: "sans-serif-medium",
    fontSize: 28,
    top: 95,
    left: 22,
    fontWeight: "bold",
  },
  monthlySale: {
    position: "absolute",
    color: "#fff",
    fontFamily: "sans-serif-medium",
    fontSize: 16,
    top: 145,
    left: 20,
  },
  Menu: {
    position: "absolute",
    left: Dimensions.get("screen").width * 0.07,
    top: Dimensions.get("screen").height * 0.51,
    width: 80,
    height: 70,
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#5755FE",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  AddOffer: {
    position: "absolute",
    left: Dimensions.get("screen").width * 0.38,
    top: Dimensions.get("screen").height * 0.51,
    width: 82,
    height: 70,
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#5755FE",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  Bookings: {
    position: "absolute",
    left: Dimensions.get("screen").width * 0.7,
    top: Dimensions.get("screen").height * 0.51,
    width: 80,
    height: 70,
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#5755FE",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  NoRestaurantAdded: {
    backgroundColor: "#fff",
    width: Dimensions.get("screen").width * 0.94,
    height: Dimensions.get("screen").height * 0.25,
    borderRadius: 10,
    marginTop: Dimensions.get("window").height * 0.53,
    elevation: 12,
    shadowColor: "#5755FE",
    justifyContent: "center",
    alignItems: "center",
  },
  AddRestBtn: {
    position: "absolute",
    bottom: 35,
    backgroundColor: "#fff",
    width: 100,
    height: 70,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#5755FE",
  },
});
