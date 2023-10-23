import { StyleSheet } from "react-native";

export default StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 35,
    marginTop: 20,
  },
  largeBox: {
    flexDirection: "row",
    height: 100,
    backgroundColor: "#f0f2f5",
    width: "100%",
    borderColor: "grey",
    marginBottom: 15,
    marginTop: 10,
    borderRadius: 10,
  },
  nomeBox: {
    padding: 10,
    borderRightColor: "grey",
    borderRightWidth: 1,
    borderLeftColor: "grey",
    borderLeftWidth: 1,
    width: 150,
  },
  descBox: {
    padding: 10,
    borderRightColor: "grey",
    borderRightWidth: 1,
    width: 400,
  },
  levelBox: {
    padding: 10,
    borderRightColor: "grey",
    borderRightWidth: 1,
    width: 150,
  },
  excluirBox: {
    padding: 10,
    width: 150,
  },
  boxLabel: {
    height: 20,
    backgroundColor: "white",
    textAlign: "center",
    borderRadius: 10,
    fontWeight: "bold",
    paddingTop: 2,
    marginBottom: 5,
  },
  boxText: {
    textAlign: "center",
    fontSize: 17,
    marginTop: 10,
  },
  editableText: {
    textAlign: "center",
    fontSize: 37,
  },
  editButton: {
    marginLeft: 47,
    fontSize: 10,
    paddingLeft: 5,
    paddingRight: 5,
    cursor: "pointer",
  },
  editButtonText: {
    color: "blue",
  },
  removeButton: {
    fontSize: 18,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 20,
    color: "red",
  },
  removeButtonText: {
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "blue",
    padding: 10,
    margin: 5,
  },
  buttonText: {
    color: "#fff",
  },
});
