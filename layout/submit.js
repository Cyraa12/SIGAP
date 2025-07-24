import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ImageBackground,
  TextInput,
  ScrollView,
  Switch,
} from "react-native";
import styles from "../styles/stylesUpload";
import * as DocumentPicker from "expo-document-picker";

const Submit = ({ navigation }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [jenisKorupsi, setJenisKorupsi] = useState("");
  const [wilayah, setWilayah] = useState("");
  const [isAnonim, setIsAnonim] = useState(false);

  const handleFileUpload = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    });

    if (result.assets && result.assets.length > 0) {
      const fileData = result.assets[0];

      const newFile = {
        uri: fileData.uri,
        name: fileData.name,
        type: fileData.mimeType || "application/octet-stream",
      };

      setUploadedFile(newFile);
    } else if (result.canceled) {
      Alert.alert("Dibatalkan", "Pemilihan file dibatalkan.");
    } else {
      Alert.alert("Error", "File tidak valid atau tidak dapat diproses.");
    }
  };

  const handleSubmit = async () => {
  if (!uploadedFile || !jenisKorupsi || !wilayah) {
    Alert.alert("Perhatian", "Semua field wajib diisi!");
    return;
  }

  const formData = new FormData();
  formData.append("filename", uploadedFile.name);
  formData.append("jenis_korupsi", jenisKorupsi);
  formData.append("wilayah", wilayah);
  formData.append("anonim", isAnonim ? 1 : 0);
  formData.append("file", {
    uri: uploadedFile.uri,
    name: uploadedFile.name,
    type: uploadedFile.type,
  });

  try {
    const response = await fetch("http://192.168.1.102:3000/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      Alert.alert("Sukses", "Data berhasil diunggah!");
      setUploadedFile(null);
      setJenisKorupsi("");
      setWilayah("");
      setIsAnonim(false);
      navigation.navigate("Arsip");
    } else {
      const errorText = await response.text();
      console.error("Upload gagal:", errorText);
      Alert.alert("Gagal", "Upload gagal. Coba lagi.");
    }
  } catch (error) {
    console.error("Kesalahan saat upload:", error);
    Alert.alert("Error", "Terjadi kesalahan saat upload.");
  }
};


  return (
    <ImageBackground
      source={require("../assets/3.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
        <Text style={styles.title}>Unggah Dokumen</Text>

        <TouchableOpacity style={styles.uploadButton} onPress={handleFileUpload}>
          <Text style={styles.buttonText}>Unggah File</Text>
        </TouchableOpacity>

        {uploadedFile && (
          <View style={styles.uploadedFile}>
            <Text style={styles.fileName}>{uploadedFile.name}</Text>
          </View>
        )}

        <TextInput
          placeholder="Jenis Korupsi"
          value={jenisKorupsi}
          onChangeText={setJenisKorupsi}
          style={styles.input}
        />
        <TextInput
          placeholder="Wilayah"
          value={wilayah}
          onChangeText={setWilayah}
          style={styles.input}
        />

        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
          <Text style={{ color: "white", marginRight: 10 }}>Anonim</Text>
          <Switch value={isAnonim} onValueChange={setIsAnonim} />
        </View>

        <TouchableOpacity
  style={[
    styles.submitButton,
    (!uploadedFile || !jenisKorupsi || !wilayah) && { backgroundColor: 'gray' },
  ]}
  onPress={handleSubmit}
  disabled={!uploadedFile || !jenisKorupsi || !wilayah}
>
  <Text style={styles.buttonText}>Submit</Text>
</TouchableOpacity>

      </ScrollView>
    </ImageBackground>
  );
};

export default Submit;
