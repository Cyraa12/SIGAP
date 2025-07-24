import React, { useState, useEffect } from 'react';
import {
  View, Text, Alert, FlatList, TouchableOpacity, StyleSheet, ImageBackground
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from '../styles/stylesDaftarAduan';
import { BackHandler } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

export default function LihatAduan() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [aduanList, setAduanList] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        navigation.navigate("Pengaduan");
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
      if (savedEmail) {
        setEmail(savedEmail);
        fetchAduan(savedEmail);
      } else {
        Alert.alert('Email tidak ditemukan, silakan login ulang.');
      }
    };
    fetchEmail();
  }, []);

  const fetchAduan = async (userEmail) => {
    try {
      const response = await axios.get(`http://192.168.1.102:8081/api/aduan/${userEmail}`);
      setAduanList(response.data);
    } catch (error) {
      console.error('Gagal mengambil aduan:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://192.168.1.102:8081/api/aduan/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        data: { email },
      });
      Alert.alert('Aduan berhasil dihapus');
      fetchAduan(email);
    } catch (error) {
      console.error('Gagal menghapus aduan:', error);
      Alert.alert('Gagal menghapus aduan');
    }
  };

  const handleEdit = (item) => {
    navigation.navigate("EditAduan", { aduan: item });
  };

  return (
    <ImageBackground
      source={require("../assets/3.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Daftar Aduan</Text>
        <FlatList
          data={aduanList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.aduanItem}>
              <Text style={styles.label}>Judul: {item.judul_aduan}</Text>
              <Text style={styles.label}>Isi: {item.isi_aduan}</Text>
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => handleEdit(item)} style={styles.editButton}>
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
                  <Text style={styles.buttonText}>Hapus</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
}
