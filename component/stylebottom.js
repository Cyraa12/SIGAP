import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 70,
    // borderTopWidth: 1,
    // borderTopColor: "#ddd",
    zIndex: 100,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  activeTabButton: {
    backgroundColor: "#f1c40f", // warna kuning untuk tab aktif
    borderRadius: 10,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    backgroundColor: "fff",
  },
});
