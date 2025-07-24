import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ImageBackground,
  BackHandler,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomBar from "../component/Bottombar.js";
import styles from "../styles/stylesopen.js";

const Open = ({ navigation }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("Home"); // ganti dengan nama screen utama kamu
      return true; // cegah default behavior (keluar app)
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // bersihkan listener saat unmount
  }, [navigation]);

  return (
    <ImageBackground
      source={require("../assets/3.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>OPEN FUND</Text>
        <Text style={styles.subtitle}>
          Laporan Keuangan Transparan
        </Text>

        <View style={styles.cardGrid}>
          <TouchableOpacity
            style={styles.card1}
            onPress={() => navigation.navigate("Tambah")}
          >
            <Text style={styles.cardText1}>Tambah Laporan</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card1}
            onPress={() => navigation.navigate("Daftar")}
          >
            <Text style={styles.cardText1}>Lihat Laporan</Text>
          </TouchableOpacity>
        </View>

        {/* <BottomBar navigation={navigation} /> */}
      </View>
    </ImageBackground>
  );
};

export default Open;
