import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  BackHandler,
  KeyboardAvoidingView,
  Platform,
  Image,
  ImageBackground
} from "react-native";
import Toast from 'react-native-toast-message';
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/styles";

const LandingPage = ({ navigation }) => {
  const [instansi, setInstansi] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [instansiList, setInstansiList] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchInstansi = async () => {
      try {
        const response = await fetch("http://192.168.1.102:8081/api/instansi");
        if (response.ok) {
          const data = await response.json();
          const uniqueData = Array.from(
            new Map(data.map((item) => [item.instansi, item])).values()
          );

          const formattedData = uniqueData.map((item, index) => ({
            label: item.instansi,
            value: item.instansi,
            key: `instansi-${index}`,
          }));

          setInstansiList(formattedData);
        } else {
          console.error("Failed to fetch instansi:", response.status);
          Toast.show({
  type: 'error',
  text1: 'Terjadi Kesalahan',
  text2: 'Tidak dapat mengambil data instansi. Coba lagi nanti.',
});

        }
      } catch (error) {
        console.error("Error fetching instansi:", error);
        Toast.show({
  type: 'error',
  text1: 'Terjadi Kesalahan',
  text2: 'Tidak dapat mengambil data instansi. Coba lagi nanti.',
});

      }
    };

    fetchInstansi();
  }, []);

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Exit App", "Are you sure you want to close the app?", [
        { text: "Cancel", style: "cancel" },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, []);

const handleLogin = async () => {
  if (!email || !password || !instansi) {
    Toast.show({
  type: 'error',
  text1: 'Login Gagal',
  text2: 'Semua kolom harus diisi.',
});

    return;
  }

  const loginData = {
    email: email.trim().toLowerCase(),
    password,
    instansi,
  };

  try {
    console.log("Attempting login with data:", loginData);
    const response = await fetch("http://192.168.1.102:8081/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Login successful. Fetched Data:", result);

      // Simpan ke AsyncStorage
      await AsyncStorage.setItem("userEmail", result.email);
      await AsyncStorage.setItem("userInstansi", result.instansi);
      await AsyncStorage.setItem("userToken", result.token); // Jika ada token

      navigation.navigate("Home", {
        userEmail: result.email,
        userName: result.nama,
        userToken: result.token,
      });

     Toast.show({
  type: 'success',
  text1: 'Login Berhasil',
  text2: `Selamat datang, ${result.nama || email}!`,
});

    } else {
      const errorData = await response.json();
      console.error("Login failed with message:", errorData.message || "Unknown error.");

      // Kondisional berdasarkan pesan dari server
      if (errorData.message?.toLowerCase().includes("not found")) {
        Toast.show({
  type: 'error',
  text1: 'Login Gagal',
  text2: `Email Tidak Terdaftar!`,
});
      } else if (errorData.message?.toLowerCase().includes("password")) {
         Toast.show({
  type: 'error',
  text1: 'Login Gagal',
  text2: `Password Salah!`,
});
      } else {
        Toast.show({
  type: 'error',
  text1: 'Login Gagal',
  text2: errorData.message || 'Email atau password salah.',
});

      }
    }
  } catch (error) {
    console.error("Error during login:", error);
     Toast.show({
  type: 'error',
  text1: 'Login Erorr',
  text2: `Gagal Login. Coba lagi nanti.`,
});
  }
};


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
    <ImageBackground
    source={require('../assets/3.png')} // ganti dengan path gambarmu
    style={styles.background}
    resizeMode="cover"
    // imageStyle={{ top: 100 }}
  >
   <View style={styles.overlay}>
      <View >
       <Image
      source={require('../assets/c.png')} // ganti dengan path gambar kamu
      style={styles.logo}
      resizeMode="contain"
    />
     <Image
      source={require('../assets/kiri.png')} // ganti dengan path gambar kamu
      style={styles.kiri}
      resizeMode="contain"
    />
    <Image
      source={require('../assets/kanan.png')} // ganti dengan path gambar kamu
      style={styles.kanan}
      resizeMode="contain"
    />
        <Text style={styles.title}>-TRUST</Text>
        <Text style={styles.subtitle}>Corruption Transparency Reporting & Secure Tracking</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>LOGIN</Text>

          <DropDownPicker
            placeholder="Select your Instansi"
            open={open}
            value={instansi}
            items={instansiList}
            setOpen={setOpen}
            setValue={setInstansi}
            setItems={setInstansiList}
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.cardsubTitle}>Belum Memiliki Akun?</Text>
          </TouchableOpacity>

          <Button title="Login" onPress={handleLogin} />
        </View>
      </View>
      </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default LandingPage;
