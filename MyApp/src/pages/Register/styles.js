import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  content: {
    width: "80%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    padding: 10,
  },
  passwordToggle: {
    padding: 10,
  },
  labelMsg: {
    fontSize: 14,
    marginBottom: 15,
  },
  labelSignin: {
    flexDirection: "row",
    justifyContent: "center",
  },
  strong: {
    fontWeight: "bold",
    marginLeft: 5,
  },
});
