import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert,ImageBackground } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomBar from "../component/Bottombar.js"; // Pastikan jalur impor benar
import styles from "../styles/stylesopen.js";

const Submithome = ({ navigation }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true); // State untuk mengetahui status pengecekan



  return (
    <ImageBackground
        source={require("../assets/3.png")}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
    <View style={styles.container}>
      {/* Konten utama */}
      <Text style={styles.title}>SUBMIT VAULT</Text>
      <Text style={styles.subtitle}>
        Pengajuan dan Brankas Digital Aman
      </Text>

      {/* Grid 4 Card */}
      <View style={styles.cardGrid}>
        <TouchableOpacity style={styles.card1} onPress={() => navigation.navigate("Arsip")}>
          <Text style={styles.cardText1}>ARSIP DIGITAL</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card1} onPress={() => navigation.navigate("Submit")}>
          <Text style={styles.cardText1}>UPLOAD DATA</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Bar */}
      {/* <BottomBar navigation={navigation} /> */}
    </View>
    </ImageBackground>
  );
};

export default Submithome;
