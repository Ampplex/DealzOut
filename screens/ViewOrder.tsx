import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ViewOrder = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Coming soon...</Text>
    </View>
  );
};

export default ViewOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
