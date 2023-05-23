import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../../constants";
import { color } from "react-native-reanimated";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    alignSelf: "center",
    flexDirection: "row",
    height: 70,
  },
  textHeader: {
    position: 'absolute',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    top: 150
  },
  Tragetcontainer: {
    top: 190,
    flexDirection: 'row',
    position: 'absolute',
    alignItems: "center",
    justifyContent: "center",
  },
  textTarget: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'orange'

  },
  input: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'orange',
    fontSize: 35,
  },
  text: {
    color: "white",
    fontSize: 47,
    textAlign: 'center'
  },
  buttonLayer: { 
    position: 'absolute', 
    bottom: 120
  },
  button: {
    width: 100,
    height: 40,
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    elevation: 10,
  },
  buttonText: { fontSize: 15, color: "white" },
  title: { fontSize: 40, flex: 0.5, color: "gray" },
});

export default styles;
