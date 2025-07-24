import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Linking,
  ImageBackground,
  Alert,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import styles from "../styles/stylesOpenfund";

const Arsip = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [instansi, setInstansi] = useState("");
  const [instansiList, setInstansiList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
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
          Alert.alert("Error", "Unable to fetch instansi.");
        }
      } catch (error) {
        Alert.alert("Error", "Unable to fetch instansi. Please try again.");
      }
    };

    fetchInstansi();
  }, []);

  useEffect(() => {
    fetch("http://192.168.210.153:3000/laporan")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal mengambil data");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Gagal mengambil data");
        setLoading(false);
      });
  }, []);

  const filteredData = data.filter(
    (item) =>
      (item.label ?? "").toLowerCase().includes(filter.toLowerCase()) &&
      (instansi === "" || item.wilayah === instansi || item.instansi === instansi)
  );

  const handleDownload = (item) => {
    let url = "";

    if (item.file_laporan) {
      url = `http://192.168.210.153:3000${item.file_laporan}`;
    } else if (item.filename) {
      url = `http://192.168.210.153:3000/uploads/${item.filename}`;
    } else {
      Alert.alert("File tidak ditemukan.");
      return;
    }

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert("Tidak dapat membuka URL", url);
        }
      })
      .catch((err) => {
        console.error("Gagal membuka URL:", err);
        Alert.alert("Terjadi kesalahan saat membuka URL.");
      });
  };

  return (
    <ImageBackground
      source={require("../assets/3.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Arsip Laporan Korupsi</Text>
        <Text style={styles.subtitle}>Data hasil upload dan klasifikasi</Text>

        <View style={styles.filterContainer}>
          <TextInput
            style={styles.input}
            placeholder="Cari berdasarkan label atau wilayah..."
            value={filter}
            onChangeText={setFilter}
          />
          <DropDownPicker
            placeholder="Pilih wilayah"
            open={open}
            value={instansi}
            items={instansiList}
            setOpen={setOpen}
            setValue={setInstansi}
            setItems={setInstansiList}
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
          />
        </View>

        {loading ? (
          <Text>Memuat data...</Text>
        ) : error ? (
          <Text>{error}</Text>
        ) : (
          <FlatList
            data={filteredData.slice(0, 10)}
            keyExtractor={(item, index) => item.id?.toString() || index.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>
                    {item.jenis_anggaran
                      ? `${item.jenis_anggaran} - ${item.instansi} (${item.tahun})`
                      : item.filename}
                  </Text>
                  {item.jumlah && <Text>Jumlah: Rp{item.jumlah}</Text>}
                  {item.realisasi && <Text>Realisasi: Rp{item.realisasi}</Text>}
                  {item.label && <Text>Label: {item.label}</Text>}
                  {item.status && <Text>Status: {item.status}</Text>}
                  {item.wilayah && <Text>Wilayah: {item.wilayah}</Text>}
                  {item.jenis_korupsi && (
                    <Text>Jenis Korupsi: {item.jenis_korupsi}</Text>
                  )}
                </View>
                <TouchableOpacity
                  style={styles.downloadButton}
                  onPress={() => handleDownload(item)}
                >
                  <Text style={styles.buttonText}>Unduh</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
    </ImageBackground>
  );
};

export default Arsip;
