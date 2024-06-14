import { StyleSheet } from "react-native";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import OfferBanner from "../components/OfferBanner";
import UserLocation_context from "../context/Cache/UserLocation_context";
import LottieView from "lottie-react-native";
import LoginInfo_Context from "../context/LoginInfo/LoginInfo_Context";

const HomeScreen = ({ navigation }) => {
  const { userLocation, address } = useContext(UserLocation_context);
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
    // console.log(name[0);
  };

  useEffect(() => {
    fetchName();
  }, []);

  return (
    <>
      <StatusBar backgroundColor={"white"} />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.OrderOptionseparator}>
          <View style={styles.OrderTitle}>
            <Text
              style={{
                color: "#585858",
                fontFamily: "sans-serif-medium",
                fontSize: 16,
              }}
            >
              E X P L O R E
            </Text>
          </View>
        </View>

        <View style={styles.offerBannerContainer}>
          <OfferBanner />
        </View>

        <TouchableOpacity
          style={styles.viewOrder}
          onPress={() => navigation.navigate("ViewOrder")}
        >
          <LottieView
            source={require("../assets/animations/viewOrder.json")}
            autoPlay
            loop
            style={{
              width: 100,
              height: 100,
              position: "absolute",
              top: -8,
            }}
          />
          <Text
            style={{
              position: "absolute",
              bottom: -28,
              alignSelf: "center",
              fontFamily: "sans-serif-medium",
              fontWeight: "bold",
              color: "#000",
            }}
          >
            View orders
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.Order}
          onPress={() => navigation.navigate("Order")}
        >
          <LottieView
            source={require("../assets/animations/order.json")}
            autoPlay
            loop
            style={{
              width: 130,
              height: 130,
              position: "absolute",
              top: -6,
            }}
          />
          <Text
            style={{
              position: "absolute",
              bottom: -28,
              alignSelf: "center",
              fontFamily: "sans-serif-medium",
              fontWeight: "bold",
              color: "#000",
            }}
          >
            Order
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.Offers}
          onPress={() => navigation.navigate("Offers")}
        >
          <LottieView
            source={require("../assets/animations/offer.json")}
            autoPlay
            loop
            style={{
              width: 100,
              height: 100,
              position: "absolute",
              bottom: 2,
            }}
          />
          <Text
            style={{
              position: "absolute",
              bottom: -28,
              alignSelf: "center",
              fontFamily: "sans-serif-medium",
              fontWeight: "bold",
              color: "#000",
            }}
          >
            Offers
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.SearchBar}
          onPress={() => navigation.navigate("Search")}
        >
          <Feather
            name="search"
            size={22}
            color="#5559CE"
            style={{ position: "absolute", left: 15, top: 13 }}
          />
          <Text
            style={{
              color: "#585858",
              fontSize: 14.5,
              textAlign: "left",
              left: 45,
              top: 13,
            }}
          >
            Find restaurants near you...
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.Header}>
        <MaterialIcons
          style={{ marginTop: 22, left: 10 }}
          name="location-pin"
          size={30}
          color="#5559CE"
        />
        <Text numberOfLines={1} style={styles.Address}>{`${
          address || "Fetching address..."
        }`}</Text>
        <TouchableOpacity onPress={() => console.log("Notification")}>
          <Ionicons
            name="notifications-outline"
            size={25}
            color="#5559CE"
            style={{ position: "absolute", right: 30, top: -25 }}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    minHeight: Dimensions.get("screen").height,
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
});
