import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // semi transparan agar readable di atas image
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  message: {
    backgroundColor: "#ffffffcc", // putih semi-transparan
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  threadTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
    color: "#333",
  },
  threadAuthor: {
    fontStyle: "italic",
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  replyContainer: {
    marginLeft: 16,
    marginTop: 8,
    backgroundColor: "#f0f0f0",
    padding: 8,
    borderRadius: 8,
  },
  replyText: {
    color: "#333",
  },
  replyButton: {
    marginTop: 8,
    color: "#007BFF",
    fontWeight: "bold",
  },
  inputContainer: {
    marginTop: 10,
    backgroundColor: "#ffffffcc",
    padding: 10,
    borderRadius: 10,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default styles;
