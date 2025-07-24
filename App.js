import React from "react";
import Toast from 'react-native-toast-message';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, StyleSheet } from "react-native";
import LandingPage from "./layout/LandingPage";
import Register from "./layout/Register";
import HalamanUtama from "./layout/HalamanUtama";
import Profile from "./layout/Profile";
import CustomCalendar from "./layout/Kalender"
import Open from "./layout/Open";
import Submit from "./layout/submit";
import Pengaduan from "./layout/Pengaduan";
import Forum from "./layout/Forum";
import Submithome from "./layout/Submithome";
import Arsip from "./layout/Arsip";
import TambahOpenFund from "./layout/TambahOpenFund";
import DaftarOpenFund from "./layout/DaftarOpenFund";
import TambahAduan from "./layout/TambahAduan";
import EditAduan from "./layout/EditAduan";
import LihatAduan from "./layout/LihatAduan";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={LandingPage} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={HalamanUtama} />
         <Stack.Screen name="Profile" component={Profile} />
         <Stack.Screen name="Kalender" component={CustomCalendar} />
         <Stack.Screen name="Open" component={Open} />
         <Stack.Screen name="Tambah" component={TambahOpenFund} />
         <Stack.Screen name="Daftar" component={DaftarOpenFund} />
        <Stack.Screen name="EditAduan" component={EditAduan} />
         <Stack.Screen name="Submithome" component={Submithome} />
         <Stack.Screen name="Arsip" component={Arsip} />
         <Stack.Screen name="Submit" component={Submit} />
         <Stack.Screen name="Pengaduan" component={Pengaduan} />
         <Stack.Screen name="TambahAduan" component={TambahAduan} />
         <Stack.Screen name="Lihat" component={LihatAduan} />
         <Stack.Screen name="Forum" component={Forum} />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
    
  );
}


