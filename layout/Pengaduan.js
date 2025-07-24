import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert ,ImageBackground} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomBar from "../component/Bottombar.js"; // Pastikan jalur impor benar
import styles from "../styles/stylesopen.js";
import { BackHandler } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

const Submithome = ({ navigation }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true); // State untuk mengetahui status pengecekan
useFocusEffect(
  React.useCallback(() => {
    const backAction = () => {
      navigation.navigate("Home"); // Ganti dengan nama route tujuan
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [navigation])
);

  return (
    <ImageBackground
        source={require("../assets/3.png")}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
    <View style={styles.container}>
      {/* Konten utama */}
      <Text style={styles.title}>WHISTLEBLOWER DAN PENGADUAN</Text>
      <Text style={styles.subtitle}>
        Pengaduan dan Pelaporan
      </Text>

      {/* Grid 4 Card */}
      <View style={styles.cardGrid}>
        <TouchableOpacity style={styles.card1} onPress={() => navigation.navigate("TambahAduan")}>
          <Text style={styles.cardText1}>PENGADUAN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card1} onPress={() => navigation.navigate("Lihat")}>
          <Text style={styles.cardText1}>DAFTAR ADUAN</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Bar */}
      {/* <BottomBar navigation={navigation} /> */}
    </View>
    </ImageBackground>
  );
};

export default Submithome;
