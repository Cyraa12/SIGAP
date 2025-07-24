import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ImageBackground,
  BackHandler
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/stylesforum";
import { useFocusEffect } from "@react-navigation/native";

const Forum = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [newReply, setNewReply] = useState("");
  const [userData, setUserData] = useState(null);

  // ⬅️ Tangani tombol back
  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        navigation.navigate("Home");
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    }, [navigation])
  );

  // ⬇️ Ambil data user & email
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
          `http://192.168.1.102:8081/api/users/nama-instansi/${encodeURIComponent(
            storedEmail
          )}`
        );

        if (response.ok) {
          const data = await response.json();
          setUserData({
            nama: data.nama || "User",
            email: storedEmail,
            instansi: data.instansi || "Tidak tersedia",
          });
        } else {
          Alert.alert("Error", "Gagal mengambil data user.");
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        Alert.alert("Error", "Gagal menghubungi server.");
      }
    };

    fetchUserData();
  }, [navigation]);

  // ⬇️ Ambil semua thread
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://192.168.1.102:8081/api/forum/threads");
        const threads = response.data;

        const threadsWithReplies = await Promise.all(
          threads.map(async (thread) => {
            try {
              const res = await axios.get(
                `http://192.168.1.102:8081/api/forum/comment/${thread.id}`
              );
              return { ...thread, replies: res.data || [] };
            } catch (err) {
              console.error(`Gagal ambil komentar untuk thread ${thread.id}`, err);
              return { ...thread, replies: [] };
            }
          })
        );

        setMessages(threadsWithReplies);
      } catch (error) {
        console.error("Gagal memuat forum:", error);
        Alert.alert("Error", "Gagal memuat data forum.");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  // ⬇️ Kirim thread baru
  const sendThread = async () => {
    if (!judul.trim() || !isi.trim()) {
      Alert.alert("Peringatan", "Judul dan isi tidak boleh kosong.");
      return;
    }

    if (!userData?.email) {
      Alert.alert("Error", "Data pengguna belum tersedia.");
      return;
    }

    try {
      const postData = {
        email: userData.email,
        judul,
        isi,
      };

      const response = await axios.post("http://192.168.1.102:8081/api/forum/thread", postData);

      if (response.status === 200 || response.status === 201) {
        const newThread = {
          ...response.data,
          replies: [],
        };

        setMessages((prev) => [...prev, newThread]);
        setJudul("");
        setIsi("");
        Alert.alert("Sukses", "Thread berhasil diposting.");
      } else {
        Alert.alert("Gagal", "Gagal mengirim thread.");
      }
    } catch (error) {
      console.error("Gagal mengirim thread:", error?.response || error);
      Alert.alert("Error", "Gagal mengirim thread ke server.");
    }
  };

  const sendReply = async (threadId, replyText) => {
    if (!replyText.trim()) return;

    try {
      await axios.post("http://192.168.1.102:8081/api/forum/comment", {
        thread_id: threadId,
        email: userData?.email,
        komentar: replyText,
      });

      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === threadId
            ? {
                ...msg,
                replies: [
                  ...(msg.replies || []),
                  {
                    id: Date.now().toString(),
                    komentar: replyText,
                    email: userData?.email,
                  },
                ],
              }
            : msg
        )
      );
    } catch (error) {
      console.error("Gagal mengirim balasan:", error);
      Alert.alert("Gagal", "Tidak dapat mengirim balasan");
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Memuat forum...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../assets/3.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Text style={styles.title}>Forum Diskusi</Text>

        <FlatList
          data={messages}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={({ item }) => (
            <View style={styles.message}>
              <Text style={styles.threadTitle}>{item.judul}</Text>
              <Text>{item.isi}</Text>
              <Text style={styles.threadAuthor}>Oleh: {item.email}</Text>

              {(item.replies || []).map((reply) => (
                <View key={reply.id} style={styles.replyContainer}>
                  <Text style={styles.replyText}>↳ {reply.komentar}</Text>
                  <Text style={styles.threadAuthor}>Oleh: {reply.email}</Text>
                </View>
              ))}

              <TouchableOpacity onPress={() => setReplyingTo(item.id)}>
                <Text style={styles.replyButton}>Balas</Text>
              </TouchableOpacity>

              {replyingTo === item.id && (
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={newReply}
                    onChangeText={setNewReply}
                    placeholder="Tulis balasan..."
                  />
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      sendReply(item.id, newReply);
                      setNewReply("");
                      setReplyingTo(null);
                    }}
                  >
                    <Text style={styles.buttonText}>Kirim</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={judul}
            onChangeText={setJudul}
            placeholder="Judul Thread"
          />
          <TextInput
            style={[styles.input, { height: 80 }]}
            value={isi}
            onChangeText={setIsi}
            placeholder="Isi Thread"
            multiline
          />
          <TouchableOpacity style={styles.button} onPress={sendThread}>
            <Text style={styles.buttonText}>Post</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default Forum;
