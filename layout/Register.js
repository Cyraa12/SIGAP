import React, { useState ,useEffect} from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Toast from 'react-native-toast-message';
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/stylesRegis";

const Register = () => {
  const navigation = useNavigation();
  const [instansi, setInstansi] = useState("");
  const [email, setEmail] = useState("");
  const [nama, setNama] = useState("");
  const [password, setPassword] = useState("");
  const [instansiList, setInstansiList] = useState([]);
  const [open, setOpen] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  console.log("Starting registration process...");
  console.log("Input Data:", { email, password, instansi, nama });

  if (!emailRegex.test(email)) {
    Toast.show({
  type: 'error',
  text1: 'Invalid Email',
  text2: 'Please enter a valid email address.',
});
    console.log("Email validation failed. Input:", email);
    return;
  }

  if (!passwordRegex.test(password)) {
   Toast.show({
  type: 'error',
  text1: 'Invalid Password',
  text2: 'Password must be at least 8 characters long and include both letters and numbers.',
});
    console.log("Password validation failed. Input:", password);
    return;
  }

  if (!instansi) {
Toast.show({
  type: 'error',
  text1: 'Invalid Instansi',
  text2: 'Please select or type an Instansi.',
});
    console.log("Instansi validation failed. Input:", instansi);
    return;
  }
  if (!nama) {
    Toast.show({
  type: 'error',
  text1: 'Invalid Instansi',
  text2: 'Please select or type a name.',
});
    console.log("nama validation failed. Input:", nama);
    return;
  }

  const registrationData = {
    email,
    password,
    instansi,
    nama
  };

  console.log("Prepared registration data:", registrationData);

  try {
    setIsLoading(true);
    console.log("Sending data to backend...");

    const response = await fetch("http://192.168.1.102:8081/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registrationData),
    });

    console.log("Response status:", response.status);

    let result;
    try {
      result = await response.json();
      console.log("Response body (JSON):", result);
    } catch (parseError) {
      console.log("Failed to parse JSON. Attempting to read as text...");
      result = await response.text();
      console.log("Response body (text):", result);
      Toast.show({
  type: 'error',
  text1: 'Warning',
  text2: 'Unexpected response format from server.',
});

      return;
    }

    if (response.ok) {
        Toast.show({
  type: 'success',
  text1: 'Registration Successful',
});

        console.log("Registration successful:", result.message);
        navigation.navigate("Landing");
      
    } else {
      const errorMessage = result?.error || "Something went wrong.";
      Toast.show({
  type: 'error',
  text1: 'Registration Failed',
  text2: errorMessage,
});

      console.log("Registration failed:", errorMessage);
    }
  } catch (error) {
    console.error("Error during registration:", error);
    Toast.show({
  type: 'error',
  text1: 'Error',
  text2: 'Unable to register. Please try again later.',
});

  } finally {
    setIsLoading(false);
    console.log("Registration process ended.");
  }
};


  const handleAddNewInstansi = (typedValue) => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setIsLoading(true);
    setTypingTimeout(
      setTimeout(() => {
        if (typedValue && !instansiList.some((item) => item.value === typedValue)) {
          const newInstansi = { label: typedValue, value: typedValue };
          setInstansiList((prevList) => [...prevList, newInstansi]);
          setInstansi(typedValue);
        }
        setIsLoading(false);
      }, 500)
    );
  };

  useEffect(() => {
      // Fetch daftar instansi dari backend
       const fetchInstansi = async () => {
       try {
         const response = await fetch("http://192.168.1.102:8081/api/instansi");
         if (response.ok) {
           const data = await response.json();
           
           // Menghapus duplikat berdasarkan properti `instansi`
           const uniqueData = Array.from(
             new Map(data.map((item) => [item.instansi, item])).values()
           );
     
           const formattedData = uniqueData.map((item, index) => ({
             label: item.instansi, // Sesuaikan dengan struktur backend
             value: item.instansi, // Pastikan setiap item memiliki value unik
             key: `instansi-${index}`, // Tambahkan properti key yang unik
           }));
     
           setInstansiList(formattedData);
           console.log("Instansi fetched successfully (unique):", formattedData);
         } else {
           console.error("Failed to fetch instansi:", response.status);
           Toast.show({
  type: 'error',
  text1: 'Error',
  text2: 'Unable to fetch instansi.',
});

         }
       } catch (error) {
         console.error("Error fetching instansi:", error);
         Toast.show({
  type: 'error',
  text1: 'Error',
  text2: 'Unable to fetch instansi. Please try again.',
});

       }
     };
      fetchInstansi();
    }, []);

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
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Register</Text>

          <DropDownPicker
            placeholder="Select or Type an Instansi"
            open={open}
            items={instansiList}
            value={instansi}
            setOpen={setOpen}
            setValue={setInstansi}
            setItems={setInstansiList}
            searchable
            onChangeSearchText={handleAddNewInstansi}
            searchPlaceholder="Type to search or add"
            style={styles.dropdown}
            searchContainerStyle={styles.searchContainer}
            searchTextInputStyle={styles.searchTextInput}
            listEmptyComponent={() => (
              <Text style={{ textAlign: "center", padding: 10, color: "#000000" }}>
                Wait a minute...
              </Text>
            )}
            dropDownContainerStyle={styles.dropdownContainer}
            zIndex={1000}
          />

          {isLoading && (
            <ActivityIndicator size="small" color="#0000ff" style={{ marginTop: 10 }} />
          )}

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Nama"
            value={nama}
            onChangeText={setNama}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity onPress={() => navigation.navigate("Landing")}>
            <Text style={styles.cardsubTitle}>Sudah Memiliki Akun, LOGIN</Text>
          </TouchableOpacity>   
          <Button title="Register" onPress={handleRegister} />
        </View>
      </View>
      </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};


export default Register;
