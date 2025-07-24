// TambahOpenFund.js
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import * as DocumentPicker from "expo-document-picker";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import styles from "../styles/stylesTambah";
import { BackHandler } from "react-native";

const TambahOpenFund = ({ onUploadSuccess }) => {
  const navigation = useNavigation();
  const [instansi, setInstansi] = useState("");
  const [instansiList, setInstansiList] = useState([]);
  const [open, setOpen] = useState(false);
  const [tahun, setTahun] = useState("");
  const [jenisAnggaran, setJenisAnggaran] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [realisasi, setRealisasi] = useState("");
  const [file, setFile] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        navigation.navigate("Open"); // Ganti dengan nama route tujuan
        return true;
      };
  
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
  
      return () => backHandler.remove();
    }, [navigation])
  );

  useEffect(() => {
    const fetchInstansi = async () => {
      try {
        const res = await fetch("http://192.168.1.102:8081/api/instansi");
        if (!res.ok) throw new Error("Gagal mengambil instansi");

        const data = await res.json();
        const uniqueData = Array.from(
          new Map(data.map((item) => [item.instansi, item])).values()
        );

        const formattedData = uniqueData.map((item, index) => ({
          label: item.instansi,
          value: item.instansi,
          key: `instansi-${index}`,
        }));

        setInstansiList(formattedData);
      } catch (err) {
        Alert.alert("Error", err.message);
      }
    };

    fetchInstansi();
  }, []);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (!result.canceled && result.assets?.length > 0) {
        const fileAsset = result.assets[0];
        setFile({
          uri: fileAsset.uri,
          name: fileAsset.name,
          type: fileAsset.mimeType || "*/*",
        });
      }
    } catch (err) {
      Alert.alert("Error", "Gagal memilih file");
    }
  };

  const handleUpload = async () => {
    if (!file || !instansi || !tahun || !jenisAnggaran || !jumlah || !realisasi) {
      return Alert.alert("Perhatian", "Semua field harus diisi!");
    }

    const formData = new FormData();
    formData.append("file_laporan", file);
    formData.append("instansi", instansi);
    formData.append("tahun", tahun);
    formData.append("jenis_anggaran", jenisAnggaran);
    formData.append("jumlah", jumlah);
    formData.append("realisasi", realisasi);

    try {
      const response = await axios.post(
        "http://192.168.1.102:8081/api/openfund",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200 || response.status === 201) {
        Alert.alert("Sukses", "Data berhasil diunggah!", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Daftar"), // Ganti dengan nama route tujuan
        },
      ]);
        setFile(null);
        setTahun("");
        setJenisAnggaran("");
        setJumlah("");
        setRealisasi("");
        onUploadSuccess && onUploadSuccess();
      } else {
        Alert.alert("Gagal", "Upload gagal. Coba lagi.");
      }
    } catch (err) {
      Alert.alert("Error", "Terjadi kesalahan saat upload.");
      console.error("Upload error:", err);
    }
  };

  return (
    <ImageBackground
                  source={require("../assets/3.png")}
                  style={{ flex: 1 }}
                  resizeMode="cover"
                >
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.uploadContainer}>
        <Text style={styles.title}>Tambah Open Fund</Text>

        <DropDownPicker
          placeholder="Pilih Instansi"
          open={open}
          value={instansi}
          items={instansiList}
          setOpen={setOpen}
          setValue={setInstansi}
          setItems={setInstansiList}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
          zIndex={1000}
        />

        <TextInput
          style={styles.input}
          placeholder="Tahun"
          keyboardType="numeric"
          value={tahun}
          onChangeText={setTahun}
        />
        <TextInput
          style={styles.input}
          placeholder="Jenis Anggaran"
          autoCapitalize="words"
          autoCorrect={false}
          value={jenisAnggaran}
          onChangeText={setJenisAnggaran}
        />
        <TextInput
          style={styles.input}
          placeholder="Jumlah"
          keyboardType="numeric"
          value={jumlah}
          onChangeText={setJumlah}
        />
        <TextInput
          style={styles.input}
          placeholder="Realisasi"
          keyboardType="numeric"
          value={realisasi}
          onChangeText={setRealisasi}
        />

        <TouchableOpacity style={styles.uploadButton} onPress={pickDocument}>
          <Text style={styles.buttonText}>
            {file ? `📎 ${file.name}` : "📎 Pilih File Laporan"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitButton} onPress={handleUpload}>
          <Text style={styles.submitButtonText}>🚀 Kirim</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default TambahOpenFund;
