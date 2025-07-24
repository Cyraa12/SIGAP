import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "./stylebottom";

const BottomBar = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const tabs = [
    { name: "Home", icon: require("../assets/home.png") },
    { name: "Kalender", icon: require("../assets/calender.png") },
    { name: "Profile", icon: require("../assets/profile.png") },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = route.name === tab.name;

        return (
          <TouchableOpacity
            key={tab.name}
            style={[
              styles.tabButton,
              isActive && styles.activeTabButton,
            ]}
            onPress={() => navigation.navigate(tab.name)}
          >
            <Image source={tab.icon} style={styles.icon} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomBar;
