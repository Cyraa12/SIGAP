import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: "rgba(0,0,0,0.3)", // semi-transparent overlay
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
   // 
  },
   header1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
   // 
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
   backgroundColor: "rgba(225, 125, 18, 0.41)",
   padding: 0,
   paddingHorizontal: 20,
   borderRadius: 40,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 2,
    borderColor: "#fff",
  },
  placeholderImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#aaa",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  placeholderText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  nama: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
 datetimeContainer: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: -60,
  gap: 50,
  borderRadius: 40,
//   backgroundColor: "rgba(108, 97, 97, 0.92)", // 
},
  timeText: {
    fontSize: 16,
    color: "#fff",
   right: -20,
    backgroundColor: "rgba(225, 125, 18, 0.41)",
   padding: 10,
   paddingHorizontal: 20,
   borderRadius: 40,
  },
  dateText: {
    fontSize: 16,
    color: "#ccc",
    right: 20,
     backgroundColor: "rgba(225, 125, 18, 0.41)",
   padding: 10,
   paddingHorizontal: 20,
   borderRadius: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15,
   marginTop: 100,
  },
  card1: {
    width: width * 0.44,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,

    // Shadow (iOS)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,

    // Shadow (Android)
    elevation: 4,
  },
   card1A: {
    width: width * 0.44,
    backgroundColor: "rgba(255, 0, 0, 0.62)",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,

    // Shadow (iOS)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,

    // Shadow (Android)
    elevation: 4,
  },
  card1B: {
    width: width * 0.44,
    backgroundColor: "rgba(173, 120, 22, 0.62)",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,

    // Shadow (iOS)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,

    // Shadow (Android)
    elevation: 4,
  },
   card1C: {
    width: width * 0.44,
    backgroundColor: "rgba(140, 22, 173, 0.62)",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,

    // Shadow (iOS)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,

    // Shadow (Android)
    elevation: 4,
  },
  card1D: {
    width: width * 0.44,
    backgroundColor: "rgba(255, 123, 0, 0.62)",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,

    // Shadow (iOS)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,

    // Shadow (Android)
    elevation: 4,
  },
  cardText1: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
    textAlign: "center",
  },
  cardsubtitle: {
    fontSize: 12,
    color: "#f0f0f0",
    marginTop: 5,
    textAlign: "center",
  },
  nextText: {
    marginTop: 10,
    color: "#00d4ff",
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
    backgroundColor: "rgba(255, 255, 255, 0.88)",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    marginVertical: 5,
  },
//   BottomBar: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//   },
});

export default styles;
