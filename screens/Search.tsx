import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Search = () => {
  return (
    <View style={styles.cotainer}>
      <Text>Search</Text>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  cotainer: {
    display: "flex",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
