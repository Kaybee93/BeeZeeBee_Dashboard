import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.xLarge,
  },
  header: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerBold: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontWeight: 'bold',
    fontWeight: 'bold',
    fontSize: 15,
    alignItems: "center",
  },
  headerTitle: {
    fontWeight: 'bold',
    fontWeight: 'bold',
    fontSize: 15,
    alignItems: "center",
    textAlign: 'center'
  },
  headerBtn: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.gray,
  },
  cardsContainer: {
    padding: SIZES.medium,
    gap: SIZES.small,
  }
});

export default styles;
