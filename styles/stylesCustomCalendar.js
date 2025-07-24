import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "rgba(0,0,0,0.2)", // lapisan semi-transparan agar teks lebih terbaca di atas image
  },
  container: {
    marginTop: 250,
    width: 300,
    left: 10,
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 15,
    backgroundColor: "rgba(0, 0, 0, 0.69)",

    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    // Shadow for Android
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  navButton: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  month: {
    fontSize: 22,
    fontWeight: "600",
    color: "#fff",
  },
  daysOfWeek: {
    flexDirection: "row",
    // justifyContent: "space-between",
    marginBottom: 10,
  },
  dayOfWeek: {
    flex: 1,
    textAlign: "center",
    color: "#fff",
    fontWeight: "600",
  },
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    // justifyContent: "space-between",
  },
  day: {
    width: "14%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  dayText: {
    color: "#fff",
  },
  // BottomBar: {
  //   position: "absolute",
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  // },
});

export default styles;
