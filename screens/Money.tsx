import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Money = () => {
  return (
    <View style={styles.container}>
      <Text>Money</Text>
    </View>
  );
};

export default Money;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
