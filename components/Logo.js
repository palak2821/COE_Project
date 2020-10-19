import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

export default function Logo() {
  return (
    //title and logo for panjab university
    <View
      style={{
        alignItems: "center",
      }}
    >
      <View>
        <Text style={styles.maintitle}>PANJAB UNIVERSITY</Text>
        <Text style={styles.maintitle}>CHANDIGARH</Text>
        <View>
          <Image
            style={styles.imageprop}
            source={require("../assets/images/LOGO.png")}
          />
        </View>
      </View>
    </View>
  );
}

//styling
const styles = StyleSheet.create({
  imageprop: {
    width: widthPercentageToDP("40%"),
    height: widthPercentageToDP("40%"),

    marginTop: 5,
    alignSelf: "center",
  },
  maintitle: {
    color: "#01579b",
    fontSize: widthPercentageToDP("7%"),
    textAlign: "center",
    fontWeight: "bold",
  },
});
