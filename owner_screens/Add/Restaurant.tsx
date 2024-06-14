import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  TextInput,
} from "react-native";
import React, { useEffect, useContext, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import RegistrationInfo_Context from "../../context/OwnerRegistration/RegistrationInfo_Context";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import UserLocation_context from "../../context/Cache/UserLocation_context";
import { Picker } from "@react-native-picker/picker";
import cities from "../../assets/places/cities_data";
import states from "../../assets/places/states_data";
import time from "../../assets/time_list/time_list";
import days from "../../assets/Days_List/Days_List";
import MultiSelect from "react-native-multiple-select";

const Restaurant = ({ navigation }) => {
  // Animated variables
  const cardContainerRadius = new Animated.Value(0);
  const cardContainerElevation = new Animated.Value(0);

  // Getting owner details
  const { first_name, last_name, email, phoneNo, PanCardNo, setDetails } =
    useContext(RegistrationInfo_Context);

  const { userLocation, address } = useContext(UserLocation_context);
  const [phoneNum, setPhoneNum] = useState<string>(phoneNo);

  // Address
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedState, setSelectedState] = useState("");

  // Operational Information
  const [selectedOpeningTime, setSelectedOpeningTime] = useState("");
  const [selectedClosingTime, setSelectedClosingTime] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);

  useEffect(() => {
    Animated.timing(cardContainerRadius, {
      toValue: 20,
      duration: 1500,
      useNativeDriver: false,
    }).start();
    Animated.timing(cardContainerElevation, {
      toValue: 20,
      duration: 1500,
      useNativeDriver: false,
    }).start();

    console.log(address);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Basic Details */}
      <Text
        style={{
          fontSize: 20,
          alignSelf: "flex-start",
          position: "absolute",
          top: 30,
          left: 23,
        }}
      >
        Basic Details
      </Text>

      <Animated.View
        style={{
          ...styles.cardContainer,
          borderRadius: cardContainerRadius,
          elevation: cardContainerElevation,
        }}
      >
        <View style={styles.Name}>
          <TextInput
            placeholder="Restaurant name"
            style={{
              alignSelf: "center",
              width: Dimensions.get("window").width * 0.8,
              height: Dimensions.get("window").height * 0.08,
              borderRadius: 20,
              padding: 10,
              fontSize: 15,
              paddingLeft: 15,
              paddingRight: 15,
            }}
            cursorColor={"#000"}
            maxLength={35}
          />
          <FontAwesome6
            name="hotel"
            size={18}
            color="black"
            style={{
              position: "absolute",
              right: 25,
              top: 20,
            }}
          />
        </View>
        <View style={styles.CountryCode}>
          <Text
            style={{
              fontSize: 15,
            }}
          >
            +91
          </Text>
        </View>
        <View style={styles.Contact}>
          <TextInput
            placeholder="Contact number"
            style={{
              alignSelf: "center",
              width: Dimensions.get("window").width * 0.6,
              height: Dimensions.get("window").height * 0.08,
              borderRadius: 20,
              padding: 10,
              fontSize: 15,
              paddingLeft: 15,
              paddingRight: 15,
            }}
            editable={true}
            cursorColor={"#000"}
            maxLength={10}
            keyboardType="phone-pad"
            defaultValue={phoneNum}
          />
          <Entypo
            name="phone"
            size={20}
            color="black"
            style={{
              position: "absolute",
              right: 25,
              top: 20,
            }}
          />
        </View>

        <View style={styles.Address}>
          <TextInput
            placeholder="Restaurant address"
            style={{
              alignSelf: "center",
              width: Dimensions.get("window").width * 0.8,
              height: Dimensions.get("window").height * 0.08,
              borderRadius: 20,
              padding: 10,
              fontSize: 15,
              paddingLeft: 15,
              paddingRight: 15,
            }}
            cursorColor={"#000"}
          />
        </View>

        <View style={styles.cityPicker}>
          <Picker
            selectedValue={selectedCity}
            onValueChange={(itemValue) => setSelectedCity(itemValue)}
          >
            <Picker.Item
              label="City"
              value=""
              style={{
                fontSize: 15,
              }}
            />
            {cities.map((city, index) => (
              <Picker.Item key={index} label={city} value={city} />
            ))}
          </Picker>
        </View>

        <View style={styles.statePicker}>
          <Picker
            selectedValue={selectedState}
            onValueChange={(itemValue) => setSelectedState(itemValue)}
          >
            <Picker.Item
              label="State"
              value=""
              style={{
                fontSize: 15,
              }}
            />
            {states.map((state, index) => (
              <Picker.Item key={index} label={state} value={state} />
            ))}
          </Picker>
        </View>
      </Animated.View>

      {/* Operational Details */}
      <Text
        style={{
          fontSize: 20,
          alignSelf: "flex-start",
          position: "absolute",
          top: 500,
          left: 23,
        }}
      >
        Operational Details
      </Text>
      <Animated.View
        style={{
          ...styles.cardContainer2,
          borderRadius: cardContainerRadius,
          elevation: cardContainerElevation,
        }}
      >
        {/* Opening Time Picker */}
        <Text
          style={{
            fontSize: 15,
            alignSelf: "flex-start",
            position: "absolute",
            top: 30,
            left: 25,
          }}
        >
          Opening time
        </Text>
        <View style={styles.openingTimePicker}>
          <Picker
            selectedValue={selectedOpeningTime}
            onValueChange={(itemValue) => setSelectedOpeningTime(itemValue)}
          >
            <Picker.Item
              label="select"
              value=""
              style={{
                fontSize: 15,
              }}
            />
            {time.map((state, index) => (
              <Picker.Item key={index} label={state} value={state} />
            ))}
          </Picker>
        </View>

        {/* Closing Time Picker */}
        <Text
          style={{
            fontSize: 15,
            alignSelf: "flex-start",
            position: "absolute",
            top: 30,
            right: 45,
          }}
        >
          Closing time
        </Text>
        <View style={styles.closingTimePicker}>
          <Picker
            selectedValue={selectedClosingTime}
            onValueChange={(itemValue) => setSelectedClosingTime(itemValue)}
          >
            <Picker.Item
              label="select"
              value=""
              style={{
                fontSize: 15,
              }}
            />
            {time.map((state, index) => (
              <Picker.Item key={index} label={state} value={state} />
            ))}
          </Picker>
        </View>

        <Text
          style={{
            fontSize: 15,
            alignSelf: "flex-start",
            position: "absolute",
            top: 150,
            left: 30,
          }}
        >
          Holiday
        </Text>
        <MultiSelect
          items={days}
          uniqueKey="id"
          onSelectedItemsChange={(selectedDays) =>
            setSelectedDays(selectedDays)
          }
          selectedItems={selectedDays}
          selectText="Pick Items"
          searchInputPlaceholderText="Search Items..."
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: "#CCC" }}
          submitButtonColor="#CCC"
          submitButtonText="Submit"
        />
      </Animated.View>
    </ScrollView>
  );
};

export default Restaurant;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").height * 1.3,
    width: Dimensions.get("window").width,
  },
  cardContainer: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.53,
    backgroundColor: "#fff",
    position: "absolute",
    top: 80,
    shadowColor: "#5755FE",
  },
  cardContainer2: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.4,
    backgroundColor: "#fff",
    position: "absolute",
    top: 570,
    shadowColor: "#5755FE",
  },
  Name: {
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.08,
    backgroundColor: "#fafafa",
    alignSelf: "center",
    borderRadius: 20,
    position: "absolute",
    top: 20,
  },
  Contact: {
    width: Dimensions.get("window").width * 0.6,
    height: Dimensions.get("window").height * 0.08,
    backgroundColor: "#fafafa",
    alignSelf: "center",
    borderRadius: 20,
    position: "absolute",
    top: 100,
    right: 20,
  },
  CountryCode: {
    width: 60,
    height: Dimensions.get("window").height * 0.08,
    position: "absolute",
    top: 100,
    backgroundColor: "#fafafa",
    borderRadius: 20,
    left: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  Address: {
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.08,
    backgroundColor: "#fafafa",
    alignSelf: "center",
    borderRadius: 20,
    position: "absolute",
    top: 180,
    right: 20,
  },
  cityPicker: {
    height: 50,
    width: "40%",
    position: "absolute",
    top: 260,
    alignSelf: "center",
    backgroundColor: "#fafafa",
    borderRadius: 40,
    color: "#000",
    fontSize: 15,
    left: 18,
  },
  statePicker: {
    height: 50,
    width: "40%",
    position: "absolute",
    top: 260,
    alignSelf: "center",
    backgroundColor: "#fafafa",
    borderRadius: 40,
    color: "#000",
    fontSize: 15,
    right: 18,
  },
  openingTimePicker: {
    height: 50,
    width: "40%",
    position: "absolute",
    top: 70,
    left: 15,
    alignSelf: "center",
    backgroundColor: "#fafafa",
    borderRadius: 40,
    color: "#000",
    fontSize: 15,
  },
  closingTimePicker: {
    height: 50,
    width: "40%",
    position: "absolute",
    top: 70,
    right: 15,
    alignSelf: "center",
    backgroundColor: "#fafafa",
    borderRadius: 40,
    color: "#000",
    fontSize: 15,
  },
});
