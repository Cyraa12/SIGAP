import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
    backgroundColor: "rgba(0, 0, 0, 0.3)", // semi-transparent overlay di atas ImageBackground
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#ddd",
    textAlign: "center",
    marginBottom: 40,
  },
  cardGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card1: {
    width: width * 0.42,
    backgroundColor: "rgba(199, 133, 18, 0.47)",
    borderRadius: 15,
    paddingVertical: 30,
    paddingHorizontal: 10,

    // Shadow (iOS)
    // shadowColor: "#fff",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,

    // // Shadow (Android)
    // elevation: 5,
  },
  cardText1: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});

export default styles;
