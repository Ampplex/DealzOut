import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Offers = () => {
  return (
    <View style={styles.container}>
      <Text>Offers coming soon...</Text>
    </View>
  );
};

export default Offers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
