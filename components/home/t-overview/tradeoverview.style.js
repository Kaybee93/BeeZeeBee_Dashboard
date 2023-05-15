import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
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
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.primary,
  },
  headerBtn: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.gray,
  },
  cardsContainer: {
    marginTop: SIZES.medium,
    gap: SIZES.small,
  },
  tradeDate: {
    textAlign: "center",
    fontSize: SIZES.medium,
    fontFamily: "DMBold",
    marginTop: 20
  },
});

export default styles;
