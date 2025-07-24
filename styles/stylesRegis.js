import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#000000", // Warna background gelap seperti landing
//     paddingHorizontal: 20,
//     justifyContent: "center",
//   },
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
card: {
    backgroundColor: "transparent",
    borderRadius: 40,
    padding: 20,
    // elevation: 4,
    // shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    top: 200,
  },
  cardTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#c9a344ff", // Warna emas seperti title landing
    textAlign: "center",
    marginBottom: 20,
    textShadowColor: "#ffffff",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
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
    borderColor: "#000000ff",
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 10,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  dropdown: {
    height: 45,
    borderColor: "#000000ff",
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
  searchContainer: {
    borderBottomColor: "#ffffffff",
    borderBottomWidth: 1,
  },
  searchTextInput: {
    height: 45,
    borderRadius: 8,
    borderColor: "#000000ff",
    borderWidth: 1,
    paddingHorizontal: 10,
    color: "#fff",
    backgroundColor: "#ffffffff",
  },
  registerButton: {
    backgroundColor: "#c9a344",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
  },
  registerButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default styles;
