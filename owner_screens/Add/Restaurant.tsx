import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
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
import { RadioButton } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { showMessage } from "react-native-flash-message";
import queryString from "query-string";
import { storage } from "../../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Restaurant = ({ navigation }) => {
  const cardContainerRadius = new Animated.Value(0);
  const cardContainerElevation = new Animated.Value(0);

  const { id, first_name, last_name, email, phoneNo, PanCardNo, setDetails } =
    useContext(RegistrationInfo_Context);

  const { userLocation, address } = useContext(UserLocation_context);

  const [phoneNum, setPhoneNum] = useState<string>(phoneNo);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedOpeningTime, setSelectedOpeningTime] = useState<string>("");
  const [selectedClosingTime, setSelectedClosingTime] = useState<string>("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [seatingCapacity, setSeatingCapacity] = useState<string>(null);
  const [dietary, setDietary] = useState<string>("first");
  const [image1, setImage1] = useState<string>(null);
  const [image2, setImage2] = useState<string>(null);
  const [image3, setImage3] = useState<string>(null);
  const [websiteLink, setWebsiteLink] = useState<string>("");
  const [restaurantName, setRestaurantName] = useState<string>("");
  const [restaurantAddress, setRestaurantAddress] = useState<string>("");

  const pickImage = async (imageNumber: number) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (imageNumber == 1) {
        setImage1(result.assets[0].uri);
      } else if (imageNumber == 2) {
        setImage2(result.assets[0].uri);
      } else {
        setImage3(result.assets[0].uri);
      }
    }
  };

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
  }, []);

  const uploadImage = async (uri: string) => {
    if (!uri) {
      console.error("No file provided");
      return;
    }

    const filename = uri.substring(uri.lastIndexOf("/") + 1);
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, `images/${id}/${filename}`);

    try {
      const snapshot = await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  };

  const addRestaurant = async () => {
    const apiUrl = "https://dealzout.onrender.com/api/owners/AddRestaurant";

    const uploadUri1 =
      Platform.OS === "ios" ? image1.replace("file://", "") : image1;
    const uploadUri2 =
      Platform.OS === "ios" ? image2.replace("file://", "") : image2;
    const uploadUri3 =
      Platform.OS === "ios" ? image3.replace("file://", "") : image3;

    const uploadedImgLink1 = await uploadImage(uploadUri1);
    const uploadedImgLink2 = await uploadImage(uploadUri2);
    const uploadedImgLink3 = await uploadImage(uploadUri3);

    console.log("Image uploaded1 : ", uploadedImgLink1);
    console.log("Image uploaded2 : ", uploadedImgLink2);
    console.log("Image uploaded3 : ", uploadedImgLink3);

    if (!uploadedImgLink1 || !uploadedImgLink2 || !uploadedImgLink3) {
      showMessage({
        message: "Failed to upload the images",
        type: "danger",
        duration: 1500,
        floating: true,
        icon: "danger",
      });
      return;
    }

    const data = {
      ownerId: id,
      restaurantName: restaurantName,
      seatingCapacity: seatingCapacity,
      restaurantAddress: restaurantAddress,
      city: selectedCity,
      state: selectedState,
      openingTime: selectedOpeningTime,
      closingTime: selectedClosingTime,
      websiteLink: websiteLink,
      dietaryOptions: dietary,
      img1: uploadedImgLink1,
      img2: uploadedImgLink2,
      img3: uploadedImgLink3,
    };

    const formDataString = queryString.stringify(data);

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formDataString,
    })
      .then((response) => {
        if (!response.ok) {
          showMessage({
            message: "Invalid information",
            type: "danger",
            duration: 1500,
            floating: true,
            icon: "danger",
          });
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        showMessage({
          message: "Added successfully!",
          type: "success",
          duration: 1500,
          floating: true,
          icon: "success",
        });
        return response.json();
      })
      .then((data) => {
        console.log("POST request successful:", data);
      })
      .catch((error) => {
        console.error("Error during POST request:", error);
      });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
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
            onChangeText={(name: string) => setRestaurantName(name)}
            cursorColor={"#000"}
            maxLength={35}
            value={restaurantName}
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
            onChangeText={(number: string) => setPhoneNum(number)}
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
            onChangeText={(address) => setRestaurantAddress(address)}
            value={restaurantAddress}
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
            alignSelf: "center",
            position: "absolute",
            top: 150,
          }}
        >
          Holiday
        </Text>
        <View style={styles.daySelector}>
          <MultiSelect
            items={days}
            uniqueKey="id"
            onSelectedItemsChange={(selectedDays) =>
              setSelectedDays(selectedDays)
            }
            selectedItems={selectedDays}
            selectText="Select Day"
            searchInputPlaceholderText="Search day..."
            tagRemoveIconColor="#000"
            tagTextColor="#000"
            tagBorderColor="#000"
            selectedItemTextColor="#000"
            selectedItemIconColor="#000"
            itemTextColor="#000"
            displayKey="day"
            searchInputStyle={{ color: "#000" }}
            submitButtonColor="#000"
            submitButtonText="Submit"
          />
        </View>
      </Animated.View>

      <Animated.View
        style={{
          ...styles.cardContainer3,
          borderRadius: cardContainerRadius,
          elevation: cardContainerElevation,
        }}
      >
        <TextInput
          placeholder="Website link"
          style={{
            alignSelf: "center",
            width: Dimensions.get("window").width * 0.8,
            height: Dimensions.get("window").height * 0.08,
            borderRadius: 20,
            padding: 10,
            fontSize: 15,
            paddingLeft: 15,
            paddingRight: 15,
            backgroundColor: "#F5F5F5",
            top: 20,
          }}
          cursorColor={"#000"}
          onChangeText={(website: string) => setWebsiteLink(website)}
        />

        <TextInput
          placeholder="Seating Capacity"
          style={{
            alignSelf: "center",
            width: Dimensions.get("window").width * 0.8,
            height: Dimensions.get("window").height * 0.08,
            borderRadius: 20,
            padding: 10,
            fontSize: 15,
            paddingLeft: 15,
            paddingRight: 15,
            backgroundColor: "#F5F5F5",
            top: 50,
          }}
          onChangeText={(capacity: string) => setSeatingCapacity(capacity)}
          keyboardType="number-pad"
          cursorColor={"#000"}
        />

        <Text
          style={{
            fontSize: 17,
            alignSelf: "flex-start",
            left: 25,
            top: 70,
          }}
        >
          Dietary Options
        </Text>

        <View style={styles.dietaryOptions}>
          {/* Option 1 */}

          <View>
            <RadioButton
              value="first"
              status={dietary === "first" ? "checked" : "unchecked"}
              onPress={() => setDietary("first")}
            />
            <Text
              style={{
                position: "absolute",
                left: 50,
                top: 5,
                fontSize: 15,
              }}
            >
              Vegetarian
            </Text>
          </View>

          {/* Option 2 */}

          <View>
            <RadioButton
              value="second"
              status={dietary === "second" ? "checked" : "unchecked"}
              onPress={() => setDietary("second")}
            />
            <Text
              style={{
                position: "absolute",
                left: 50,
                top: 5,
                fontSize: 15,
              }}
            >
              Non-Vegetarian
            </Text>
          </View>

          {/* Option 3 */}

          <View>
            <RadioButton
              value="third"
              status={dietary === "third" ? "checked" : "unchecked"}
              onPress={() => setDietary("third")}
            />
            <Text
              style={{
                position: "absolute",
                left: 50,
                top: 5,
                fontSize: 15,
              }}
            >
              Vegan
            </Text>
          </View>

          {/* Option 4 */}

          <View>
            <RadioButton
              value="fourth"
              status={dietary === "fourth" ? "checked" : "unchecked"}
              onPress={() => setDietary("fourth")}
            />
            <Text
              style={{
                position: "absolute",
                left: 50,
                top: 5,
                fontSize: 15,
                width: 120,
              }}
            >
              Veg & Non-Veg
            </Text>
          </View>
        </View>
      </Animated.View>

      <Text
        style={{
          fontSize: 20,
          alignSelf: "center",
          position: "absolute",
          top: Dimensions.get("window").height * 1.235,
          left: 23,
        }}
      >
        Other Details
      </Text>

      {/* Upload Image 1 */}

      <Animated.View
        style={{
          ...styles.uploadImg1Container,
          borderRadius: cardContainerRadius,
          elevation: cardContainerElevation,
        }}
      >
        <Text
          style={{
            fontSize: 17,
            fontFamily: "sans-serif-medium",
            alignSelf: "center",
            position: "absolute",
            top: 50,
            left: 25,
          }}
        >
          Upload 1st Image of your restaurant
        </Text>
        <TouchableOpacity
          style={styles.uploadImgBtn1}
          onPress={() => pickImage(1)}
        >
          <Feather name="upload" size={22} color="#000" />
        </TouchableOpacity>
        {image1 && (
          <>
            {/* Displaying the selected image */}
            <Image source={{ uri: image1 }} style={styles.image} />
            {/* If the user presses the cancel button then the image will be removed */}
            <TouchableOpacity
              style={styles.cancelImgBtn}
              onPress={() => setImage1(null)}
            >
              <Entypo name="cross" size={40} color="#fff" />
            </TouchableOpacity>
          </>
        )}
      </Animated.View>

      {/* Upload Image 2 */}

      <Animated.View
        style={{
          ...styles.uploadImg2Container,
          borderRadius: cardContainerRadius,
          elevation: cardContainerElevation,
        }}
      >
        <Text
          style={{
            fontSize: 17,
            fontFamily: "sans-serif-medium",
            alignSelf: "center",
            position: "absolute",
            top: 50,
            left: 25,
          }}
        >
          Upload 2nd Image of your restaurant
        </Text>
        <TouchableOpacity
          style={styles.uploadImgBtn1}
          onPress={() => pickImage(2)}
        >
          <Feather name="upload" size={22} color="#000" />
        </TouchableOpacity>
        {image2 && (
          <>
            {/* Displaying the selected image */}
            <Image source={{ uri: image2 }} style={styles.image} />

            {/* If the user presses the cancel button then the image will be removed */}
            <TouchableOpacity
              style={styles.cancelImgBtn}
              onPress={() => setImage2(null)}
            >
              <Entypo name="cross" size={40} color="#fff" />
            </TouchableOpacity>
          </>
        )}
      </Animated.View>

      {/* Upload Image 3 */}

      <Animated.View
        style={{
          ...styles.uploadImg3Container,
          borderRadius: cardContainerRadius,
          elevation: cardContainerElevation,
        }}
      >
        <Text
          style={{
            fontSize: 17,
            fontFamily: "sans-serif-medium",
            alignSelf: "center",
            position: "absolute",
            top: 50,
            left: 25,
          }}
        >
          Upload 3rd Image of your restaurant
        </Text>
        <TouchableOpacity
          style={styles.uploadImgBtn1}
          onPress={() => pickImage(3)}
        >
          <Feather name="upload" size={22} color="#000" />
        </TouchableOpacity>
        {image3 && (
          <>
            {/* Displaying the selected image */}
            <Image source={{ uri: image3 }} style={styles.image} />

            {/* If the user presses the cancel button then the image will be removed */}
            <TouchableOpacity
              style={styles.cancelImgBtn}
              onPress={() => setImage3(null)}
            >
              <Entypo name="cross" size={40} color="#fff" />
            </TouchableOpacity>
          </>
        )}
      </Animated.View>

      {/* Proceed Button */}
      <TouchableOpacity
        style={styles.proceedBtn}
        onPress={() => addRestaurant()}
      >
        <Text
          style={{
            color: "white",
            fontFamily: "sans-serif-medium",
            fontSize: 17,
            fontWeight: "bold",
          }}
        >
          Proceed
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Restaurant;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").height * 3.5,
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
    backgroundColor: "#F5F5F5",
    alignSelf: "center",
    borderRadius: 20,
    position: "absolute",
    top: 20,
  },
  Contact: {
    width: Dimensions.get("window").width * 0.6,
    height: Dimensions.get("window").height * 0.08,
    backgroundColor: "#F5F5F5",
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
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    left: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  Address: {
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.08,
    backgroundColor: "#F5F5F5",
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
    backgroundColor: "#F5F5F5",
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
    backgroundColor: "#F5F5F5",
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
    backgroundColor: "#F5F5F5",
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
    backgroundColor: "#F5F5F5",
    borderRadius: 40,
    color: "#000",
    fontSize: 15,
  },
  daySelector: {
    width: "70%",
    height: 60,
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    left: Dimensions.get("window").width * 0.17,
  },
  cardContainer3: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.57,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 1155,
    shadowColor: "#5755FE",
  },
  dietaryOptions: {
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.23,
    backgroundColor: "#F5F5F5",
    position: "absolute",
    top: 220,
    alignSelf: "center",
    borderRadius: 20,
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 5,
  },
  uploadImg1Container: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.4,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 800,
    shadowColor: "#5755FE",
    justifyContent: "center",
    alignItems: "center",
  },
  uploadImg2Container: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.4,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 470,
    shadowColor: "#5755FE",
    justifyContent: "center",
    alignItems: "center",
  },
  uploadImg3Container: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.4,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 140,
    shadowColor: "#5755FE",
    justifyContent: "center",
    alignItems: "center",
  },
  uploadImgBtn1: {
    width: 100,
    height: 45,
    backgroundColor: "#fafafa",
    elevation: 20,
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  cancelImgBtn: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 6,
    left: 10,
  },
  proceedBtn: {
    width: Dimensions.get("window").width * 0.4,
    height: Dimensions.get("window").height * 0.08,
    backgroundColor: "#5755FE",
    position: "absolute",
    bottom: 55,
    alignSelf: "center",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 12,
  },
});
