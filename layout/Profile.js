import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Switch,
  ImageBackground,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/stylesProfile";
import BottomBar from "../component/Bottombar";

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState({
    nama: "",
    email: "",
    instansi: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem("userEmail");
        if (!storedEmail) {
          Alert.alert("Error", "Email tidak ditemukan, silakan login ulang.");
          navigation.navigate("Landing");
          return;
        }

        const response = await fetch(
          `http://192.168.1.102:8081/api/users/nama-instansi/${encodeURIComponent(storedEmail)}`
        );

        if (response.ok) {
          const data = await response.json();
          setUserData({
            nama: data.nama || "User",
            email: storedEmail,
            instansi: data.instansi || "Tidak tersedia",
            password: data.password || "",
          });
        } else {
          Alert.alert("Error", "Gagal mengambil data user.");
        }
      } catch (error) {
        Alert.alert("Error", "Gagal menghubungi server.");
      }
    };

    fetchUserData();
  }, [navigation]);

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.102:8081/api/users/${encodeURIComponent(userData.email)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );

      if (response.ok) {
        Alert.alert("Success", "Data berhasil diperbarui.");
        setIsEditing(false);
      } else {
        Alert.alert("Error", "Gagal memperbarui data.");
      }
    } catch (error) {
      Alert.alert("Error", "Terjadi kesalahan saat memperbarui data.");
    }
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: async () => {
          await AsyncStorage.clear();
          navigation.navigate("Landing");
        },
      },
    ]);
  };

  const toggleAnonymous = () => {
    setIsAnonymous((prev) => !prev);
  };

  const displayData = isAnonymous
    ? { nama: "Anonim", email: "******", instansi: "Tidak tersedia", password: "*****" }
    : userData;

  return (
    <ImageBackground
      source={require("../assets/3.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Profil Pengguna</Text>

          <View style={styles.profileHeader}>
            {isEditing ? (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Nama"
                  value={userData.nama}
                  placeholderTextColor="#ccc"
                  onChangeText={(text) => setUserData({ ...userData, nama: text })}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Instansi"
                  value={userData.instansi}
                  placeholderTextColor="#ccc"
                  onChangeText={(text) => setUserData({ ...userData, instansi: text })}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  value={userData.password}
                  secureTextEntry={!showPassword}
                  placeholderTextColor="#ccc"
                  onChangeText={(text) => setUserData({ ...userData, password: text })}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.togglePasswordContainer}
                >
                  <Text style={styles.togglePassword}>{showPassword ? "🙈" : "👁️"}</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.profileText}>Nama: {displayData.nama}</Text>
                <Text style={styles.profileText}>Email: {displayData.email}</Text>
                <Text style={styles.profileText}>Instansi: {displayData.instansi}</Text>
                <View style={styles.passwordContainer}>
                  <Text style={styles.profileText}>
                    Password: {showPassword ? displayData.password : "*****"}
                  </Text>
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Text style={styles.togglePassword}>{showPassword ? "🙈" : "👁️"}</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>

          <View style={styles.toggleContainer}>
            <Text style={styles.toggleLabel}>
              {isAnonymous ? "Mode Anonim Aktif" : "Mode Anonim Nonaktif"}
            </Text>
            <Switch value={isAnonymous} onValueChange={toggleAnonymous} />
          </View>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => (isEditing ? handleSaveChanges() : setIsEditing(true))}
          >
            <Text style={styles.editButtonText}>
              {isEditing ? "Simpan Perubahan" : "Edit Profil"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomBar navigation={navigation} activeTab="Profile" />
    </ImageBackground>
  );
};

export default Profile;
