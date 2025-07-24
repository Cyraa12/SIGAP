import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    top: 0
  },
  overlayImage: {
  width: 200,
  height: 100,
  alignSelf: 'center',
  marginBottom: 40,
  // paddingTop: 1000, // Geser konten ke bawah
},
logo: {
  width: 200,
  height: 200,
  bottom:300,
  position: 'absolute',
},
kiri: {
  width: 200,
  height: 200,
  bottom:400,
  left: -80,
  position: 'absolute',
},
kanan: {
  width: 400,
  height: 400,
  bottom:100,
  left: 60,
  position: 'absolute',
},

  overlay: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    // backgroundColor: "rgba(255, 255, 255, 0.85)", // semi transparan agar teks tetap terbaca
  },
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  avoidingContainer: {
    flex: 1,
    justifyContent: "center",
  },
 title: {
  fontSize: 40,
  fontWeight: "bold",
  color: "#c9a344ff",
  textAlign: "center",
  marginBottom: 5,
  left: 30,
  textShadowColor: "#ffffff", // Warna bayangan
  textShadowOffset: { width: 2, height: 2 }, // Bayangan di tengah
  textShadowRadius: 8, // Semakin besar, semakin menyebar
},

  subtitle: {
    fontSize: 14,
    color: "#734406ff",
    textAlign: "center",
    marginBottom: 20,
    backgroundColor: "#c9a344ff",
    color: "#ffffff",
    borderRadius: 20,
    top: 40,
    // paddingHorizontal: 
  },
  card: {
    backgroundColor: "transparent",
    borderRadius: 40,
    padding: 20,
    // elevation: 4,
    // shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    top: 100,
  },
  cardTitle: {
    fontSize: 28,
  fontWeight: "bold",
  marginBottom: 15,
  color: "#ffffffff", // lebih dalam dari #34495e
  textAlign: "center",
  textTransform: "uppercase", // semua huruf kapital
  letterSpacing: 1.5,
  textShadowColor: "#95a5a6", // shadow tipis
  textShadowOffset: { width: 1, height: 1 },
  textShadowRadius: 2,
  },
  cardsubTitle: {
    fontSize: 14,
    color: "#ffffffff",
    textAlign: "center",
    marginTop: 10,
    textDecorationLine: "underline",
    marginBottom: 10
  },
  input: {
    height: 45,
    borderColor: "#bdc3c7",
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 10,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  dropdown: {
    height: 45,
    borderColor: "#bdc3c7",
    borderWidth: 1,
    borderRadius: 30,
    marginBottom: 12,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  dropdownContainer: {
    borderColor: "#bdc3c7",
    borderWidth: 1,
    borderRadius: 30,
    backgroundColor: "#fff",
    zIndex: 1000, // untuk menghindari tertutup komponen lain
  },
  
});


export default styles;
