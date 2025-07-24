import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Button, Alert, StyleSheet, ImageBackground
} from 'react-native';
import axios from 'axios';
import styles from '../styles/stylesEditAduan';

const EditAduan = ({ route, navigation }) => {
  const { aduan } = route.params;
  const [judulAduan, setJudulAduan] = useState(aduan.judul_aduan);
  const [isiAduan, setIsiAduan] = useState(aduan.isi_aduan);
  const [file, setFile] = useState(null);

  const handleSave = async () => {
    if (!judulAduan || !isiAduan) {
      Alert.alert('Judul dan isi aduan wajib diisi!');
      return;
    }

    const formData = new FormData();
    formData.append('judul_aduan', judulAduan);
    formData.append('isi_aduan', isiAduan);
    if (file) formData.append('bukti_file', file);

    try {
      await axios.put(`http://192.168.1.102:8081/api/aduan/${aduan.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      Alert.alert('Berhasil', 'Aduan berhasil diperbarui');
      navigation.goBack(); // Kembali ke halaman sebelumnya
    } catch (error) {
      console.error('Error update aduan:', error);
      Alert.alert('Gagal memperbarui aduan');
    }
  };

  return (
    <ImageBackground
      source={require("../assets/3.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Edit Aduan</Text>

        <TextInput
          style={styles.input}
          placeholder="Judul Aduan"
          value={judulAduan}
          onChangeText={setJudulAduan}
        />

        <TextInput
          style={styles.input}
          placeholder="Isi Aduan"
          value={isiAduan}
          onChangeText={setIsiAduan}
          multiline
        />

        <Button title="Simpan" onPress={handleSave} />
      </View>
    </ImageBackground>
  );
};

export default EditAduan;
