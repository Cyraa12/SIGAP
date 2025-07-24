import { StyleSheet } from "react-native";

export default StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    padding: 20,
    paddingBottom: 120, // agar tidak tertutup BottomBar
    flexGrow: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ffffffff", // Warna emas seperti title landing
    textAlign: "center",
    marginBottom: 20,
    marginTop: 80,
    textShadowColor: "#000000ff",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  profileHeader: {
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.1)",
    color: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  profileText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 5,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  togglePassword: {
    fontSize: 20,
    marginLeft: 10,
    color: "#fff",
  },
  toggleContainer: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 20,
  marginTop: 160,
  padding: 10,
  borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.4)",

  // Shadow iOS
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.8,
  shadowRadius: 3,

  // Shadow Android
  elevation: 3,
},

  toggleLabel: {
    color: "#ffffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  editButton: {
    backgroundColor: "#FFD700",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  editButtonText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#000",
  },
  logoutButton: {
    backgroundColor: "#ff4444",
    padding: 12,
    borderRadius: 10,
  },
  logoutButtonText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
  },
});
