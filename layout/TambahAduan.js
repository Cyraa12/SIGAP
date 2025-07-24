import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ImageBackground,
  BackHandler,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import * as DocumentPicker from 'expo-document-picker';
import styles from '../styles/stylesTambahAduan';

export default function TambahAduan({ onSubmitSuccess, selectedAduan, clearSelection }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [judulAduan, setJudulAduan] = useState('');
  const [isiAduan, setIsiAduan] = useState('');
  const [file, setFile] = useState(null);

  // Handle tombol back
  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        navigation.navigate("Pengaduan"); // Ganti dengan route yang diinginkan
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
    const fetchEmail = async () => {
      const savedEmail = await AsyncStorage.getItem('userEmail');
      if (savedEmail) setEmail(savedEmail);
      else Alert.alert('Email tidak ditemukan, silakan login ulang.');
    };
    fetchEmail();
  }, []);

  useEffect(() => {
    if (selectedAduan) {
      setJudulAduan(selectedAduan.judul_aduan);
      setIsiAduan(selectedAduan.isi_aduan);
    }
  }, [selectedAduan]);

  const handleFilePick = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (!res.canceled && res.assets?.length > 0) {
        const fileAsset = res.assets[0];
        setFile({
          uri: fileAsset.uri,
          name: fileAsset.name,
          type: fileAsset.mimeType || '*/*',
        });
      }
    } catch (error) {
      Alert.alert("Gagal memilih file");
      console.error("File picker error:", error);
    }
  };

  const resetForm = () => {
    setJudulAduan('');
    setIsiAduan('');
    setFile(null);
    clearSelection && clearSelection();
  };

  const submitAduan = async () => {
    if (!email || !judulAduan || !isiAduan) {
      Alert.alert('Email, judul, dan isi aduan wajib diisi!');
      return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('judul_aduan', judulAduan);
    formData.append('isi_aduan', isiAduan);

    if (file) {
      formData.append('bukti_file', {
        uri: file.uri,
        name: file.name,
        type: file.type || '*/*',
      });
    }

    // Debugging isi FormData
    console.log("=== FormData ===");
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    try {
      if (selectedAduan) {
        await axios.put(`http://192.168.1.102:8081/api/aduan/${selectedAduan.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        Alert.alert('Berhasil', 'Aduan berhasil diperbarui.');
      } else {
        await axios.post('http://192.168.1.102:8081/api/aduan', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        Alert.alert('Berhasil', 'Aduan berhasil dikirim.');
      }

      resetForm();
      onSubmitSuccess && onSubmitSuccess();

    } catch (error) {
      console.error('Error submit aduan:', error.response?.data || error.message);
      Alert.alert('Gagal mengirim aduan', 'Silakan periksa kembali isian dan coba lagi.');
    }
  };

  return (
    <ImageBackground
      source={require("../assets/3.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Form Pengaduan</Text>
        <Text style={styles.label}>Email: {email}</Text>

        <TextInput
          placeholder="Judul Aduan"
          value={judulAduan}
          onChangeText={setJudulAduan}
          style={styles.input}
        />

        <TextInput
          placeholder="Isi Aduan"
          value={isiAduan}
          onChangeText={setIsiAduan}
          multiline
          style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
        />

        <Button title="Pilih File (PDF/DOC/PPT/Gambar)" onPress={handleFilePick} />
        {file && <Text style={styles.label}>File: {file.name}</Text>}

        <View style={styles.buttonContainer}>
          <Button
            title={selectedAduan ? 'Perbarui Aduan' : 'Kirim Aduan'}
            onPress={submitAduan}
            color="#2196F3"
          />
        </View>
      </View>
    </ImageBackground>
  );
}
