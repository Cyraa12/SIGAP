// DaftarOpenFund.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Linking,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import styles from "../styles/stylesOpenfund";
import { useFocusEffect } from "@react-navigation/native";
import { BackHandler } from "react-native";
import { useNavigation } from "@react-navigation/native";

const DaftarOpenFund = ({navigation}) => {
  // const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [instansi, setInstansi] = useState("");
  const [instansiList, setInstansiList] = useState([]);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const fetchData = async () => {
    try {
      const response = await fetch("http://192.168.1.102:8081/api/openfund");
      const result = await response.json();
      setData(result);
    } catch (e) {
      setError("Gagal mengambil data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchInstansi();
  }, []);

  const filteredData = data.filter(
    (item) =>
      (item.instansi ?? "").toLowerCase().includes(filter.toLowerCase()) &&
      (instansi === "" || item.instansi === instansi)
  );

  return (
    <View style={{ flex: 1 }}>
      {/* <TambahOpenFund onUploadSuccess={fetchData} /> */}
 <ImageBackground
      source={require("../assets/3.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>OPEN FUND</Text>
        <Text style={styles.subtitle}>Laporan Keuangan Transparan</Text>

        <View style={styles.filterContainer}>
          <TextInput
            style={styles.input}
            placeholder="Cari laporan berdasarkan instansi"
            value={filter}
            onChangeText={setFilter}
          />
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
          />
        </View>

        {loading ? (
          <Text>Memuat data...</Text>
        ) : error ? (
          <Text>{error}</Text>
        ) : (
          <FlatList
            data={filteredData.slice(0, 10)}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>
                    {item.jenis_anggaran} - {item.instansi} ({item.tahun})
                  </Text>
                  <Text>Jumlah: Rp{item.jumlah}</Text>
                  <Text>Realisasi: Rp{item.realisasi}</Text>
                </View>
                <TouchableOpacity
                  style={styles.downloadButton}
                  onPress={() => {
                    const fullUrl = `http://192.168.1.102:8081${item.bukti_file}`;
                    Linking.openURL(fullUrl).catch((err) =>
                      console.error("Gagal membuka URL:", err)
                    );
                  }}
                >
                  <Text style={styles.buttonText}>Unduh</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
      </ImageBackground>
    </View>
  );
};

export default DaftarOpenFund;
