import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Swiper from "react-native-swiper";
import { LinearGradient } from "expo-linear-gradient";

const images = [
  {
    uri: "https://b.zmtcdn.com/data/pictures/4/18570704/20b90686cf63fd1513c8dc4b2df17bbd.jpg?fit=around|771.75:416.25&crop=771.75:416.25",
    discount: "Flat 50% off",
    rating: 4.9,
    name: "Spice Factory",
  },
  {
    uri: "https://b.zmtcdn.com/data/pictures/2/20918812/3c595986dbefefd4d48d8804c2784ce5.jpg?fit=around|771.75:416.25&crop=771.75:416.25",
    discount: "Get 20% cashback",
    rating: 4.7,
    name: "Affairs - The Bar",
  },
  {
    uri: "https://b.zmtcdn.com/data/pictures/4/19604944/9374574941505aaef253221d9940abe9.jpeg?fit=around|771.75:416.25&crop=771.75:416.25",
    discount: "70% Walk in off",
    rating: 4.5,
    name: "Fly High",
  },
];

const SliderWithText = () => {
  const handlePress = (index) => {
    console.log("Pressed slide with index:", index);
    // You can perform any action here, such as navigation to another screen
  };

  return (
    <Swiper showsButtons={false} autoplay loop bounces={true}>
      {images.map((image, index) => (
        <TouchableOpacity
          key={index}
          style={styles.slide}
          onPress={() => handlePress(index)}
        >
          <View style={styles.imageContainer}>
            <Image source={{ uri: image.uri }} style={styles.image} />
            <LinearGradient
              colors={[
                "transparent",
                "rgba(0.7, 0.7, 0.7, 0.7)",
                "rgba(0.97, 0.97, 0.97, 0.97)",
              ]}
              style={styles.gradient}
            />
          </View>

          {/* Rating */}
          <View style={styles.ratingOverlay}>
            <Text style={styles.ratingOverlayText}>{image.rating}★</Text>
          </View>

          {/* Restaurant Name */}

          <View style={styles.nameOverlay}>
            <Text style={styles.nameOverlayText}>{image.name}</Text>
          </View>

          {/* Book your table */}
          <View style={styles.bookTableOverlay}>
            <Text style={styles.bookTableOverlayText}>Book your slots</Text>
          </View>

          {/* Discount */}
          <View style={styles.discountOverLay}>
            <Text style={styles.discountOverlayText}>{image.discount}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </Swiper>
  );
};

const { width, height } = Dimensions.get("window");
const imageWidth = width * 0.95; // Adjust as needed
const imageHeight = height * 0.25; // Adjust as needed

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: imageWidth,
    height: imageHeight,
  },
  image: {
    flex: 1,
    borderRadius: 10,
  },
  discountOverLay: {
    justifyContent: "center",
    alignItems: "center",
  },
  discountOverlayText: {
    color: "#53F00B",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    bottom: 80,
    position: "absolute",
  },
  ratingOverlay: {
    backgroundColor: "black",
    textAlign: "center",
    width: 50,
    height: 29,
    bottom: 170,
    right: -140,
    borderRadius: 5,
  },
  ratingOverlayText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    position: "absolute",
    top: 5,
    alignSelf: "center",
  },
  nameOverlay: {
    justifyContent: "center",
    alignItems: "center",
  },
  nameOverlayText: {
    color: "#fff",
    fontSize: 19,
    fontFamily: "sans-serif-medium",
    fontWeight: "600",
    textAlign: "center",
    bottom: 77,
    position: "absolute",
  },
  bookTableOverlay: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    padding: 8,
    borderRadius: 20,
    bottom: 206,
    right: 110,
  },
  bookTableOverlayText: {
    color: "#fff",
    fontSize: 13,
    fontFamily: "sans-serif-medium",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 65,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
});

export default SliderWithText;
