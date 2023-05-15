import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.lightWhite
  },
  resultcontainer: {
    flex: 1,
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    marginVertical: SIZES.xLarge,
    alignItems: "center",
  },
  logoBox: {
    width: 210,
    height: 110,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.lightWhite,
    borderRadius: SIZES.large,
  },
  logoImage: {
    width: "50%",
    height: "60%",
  },
  arrowBox: {
    width: 50,
    height: 50,
    marginTop:9,
    justifyContent: "center",
    alignItems: "center",
  },
  arrowImage: {
    width: "50%",
    height: "50%",
  },
  jobTitleBox: {
    marginTop: SIZES.small,
  },
  jobTitle: {
    fontSize: SIZES.large,
    color: COLORS.primary,
    fontFamily: FONT.bold,
    textAlign: "center",
  },
  moneyBox: {
    flex: 1,
    marginTop: SIZES.small,
    flexDirection: "row",
  },
  tradeResult: (item) => ({
    fontSize: SIZES.large,
    color: item === 'loss' ? COLORS.red : COLORS.green,
    fontFamily: FONT.bold,
    textAlign: "center",
  }),
  companyInfoBox: {
    marginTop: SIZES.small / 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  companyName: {
    fontSize: SIZES.medium - 2,
    color: COLORS.primary,
    fontFamily: FONT.medium,
  },
  locationBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  locationImage: {
    width: 14,
    height: 14,
    tintColor: COLORS.gray,
  },
  locationName: {
    fontSize: SIZES.medium - 2,
    color: COLORS.gray,
    fontFamily: FONT.regular,
    marginLeft: 2,
  },
  rsiBox: {
    justifyContent: "center",
    alignItems: "center",
    
  },
  rsi: {
    fontSize: SIZES.medium,
    color: COLORS.primary,
    fontFamily: FONT.bold,
    textAlign: "center"
  },
});

export default styles;
