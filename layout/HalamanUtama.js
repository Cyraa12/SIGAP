import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity,ImageBackground } from "react-native";
import BottomBar from "../component/Bottombar.js"; // Pastikan jalur impor benar
import styles from "../styles/stylesDashboard"; 

const HalamanUtama = ({ navigation, route }) => {
  const [nama, setNama] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [currentDay, setCurrentDay] = useState("");

  useEffect(() => {
    const { userEmail, userName } = route.params || {};
    console.log("Route Params:", { userEmail, userName }); // Menampilkan username di log

    if (userName) {
      setNama(userName);
    } else {
      console.warn("Username is missing in route params.");
    }
  }, [route.params]);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
      const formattedTime = now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      const formattedDay = days[now.getDay()];
      setCurrentTime(formattedTime);
      setCurrentDay(formattedDay);
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

return (
  <ImageBackground
            source={require("../assets/3.png")}
            style={{ flex: 1 }}
            resizeMode="cover"
          >
  <View style={styles.container}>
    {/* Header di bagian atas */}
    <View style={styles.header}>
  <View style={styles.profileSection}>
  {profilePic ? (
    <Image  source={require("../assets/profile.png")} style={styles.profileImage} />
  ) : (
    <View style={styles.placeholderImage}>
      <Text style={styles.placeholderText}>
        {nama ? nama.charAt(0).toUpperCase() : (
          <Image
            source={require("../assets/profile.png")}
            style={styles.profileImage}
          />
        )}
      </Text>
    </View>
  )}
  <Text style={styles.nama}>Hi {nama}</Text>
</View>

</View>
 <View style={styles.datetimeContainer}>
    <Text style={styles.timeText}>{currentDay}</Text>
    <Text style={styles.dateText}>{currentTime}</Text>
  </View>

    {/* Konten lainnya */}
    {/* <Text style={styles.title}>C-TRUST</Text> */}
    {/* <Text style={styles.subtitle}>
      Sistem Integritas dan Gerakan Anti Penyelewengan
    </Text> */}


    {/* Grid Card */}
    <View style={styles.row}>
    <View style={styles.cardGrid}>
      <TouchableOpacity style={styles.card1A} onPress={() => navigation.navigate("Open")}>
        <Text style={styles.cardText1}>OPEN FUND</Text>
         <View style={styles.divider} /> {/* Garis pemisah */}
        <Text style={styles.cardsubtitle}>Laporan Keuangan Transparan</Text>
        <Text style={styles.nextText}>Next --{">"}</Text> {/* Teks Next */}
      </TouchableOpacity>
      <TouchableOpacity style={styles.card1B} onPress={() => navigation.navigate("Submithome")}>
        <Text style={styles.cardText1}>SUBMIT VAULT</Text>
         <View style={styles.divider} /> {/* Garis pemisah */}
        <Text style={styles.cardsubtitle}>Pengajuan dan Brankas Digital Aman</Text>
         <Text style={styles.nextText}>Next --{">"}</Text> {/* Teks Next */}
      </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.card1C} onPress={() => navigation.navigate("Pengaduan")}>
        <Text style={styles.cardText1}>WHISTLEBLOWER {"\n"} PENGADUAN</Text>
         <View style={styles.divider} /> {/* Garis pemisah */}
        <Text style={styles.cardsubtitle}>Pengaduan dan {"\n"}Pelaporan</Text>
         <Text style={styles.nextText}>Next --{">"}</Text> {/* Teks Next */}
      </TouchableOpacity>
      <TouchableOpacity style={styles.card1D} onPress={() => navigation.navigate("Forum")}>
        <Text style={styles.cardText1}>FORUM DISKUSI</Text>
         <View style={styles.divider} /> 
        <Text style={styles.cardsubtitle}>Diskusi</Text>
        <Text style={styles.cardsubtitle}>{"\n"}</Text>
                 <Text style={styles.nextText}>Next --{">"}</Text> {/* Teks Next */}
      </TouchableOpacity>
    </View>

    {/* Bottom Bar */}
    <BottomBar navigation={navigation} />
  </View>
  </ImageBackground>
);

};

export default HalamanUtama;
