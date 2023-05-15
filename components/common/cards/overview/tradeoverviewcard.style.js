import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: COLORS.darkGray,
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  },
  logoContainer: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: "70%",
    height: "70%",
  },
  arrowContainer: {
    width: 30,
    height: 30,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  arrowImage: {
    width: "50%",
    height: "50%",
    
  },
  investContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  investContainer2: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  assetName: {
    fontSize: SIZES.medium,
    fontFamily: "DMBold",
    color: COLORS.white,
  },
  tradeInvest: {
    textAlign: "right",
    fontSize: SIZES.medium,
    fontFamily: "DMBold",
    color: COLORS.white,
  },
  tradeProfit: (item) => ({
    textAlign: "right",
    fontSize: SIZES.medium,
    fontFamily: "DMBold",
    color: item === "win" ? COLORS.green : COLORS.red,
  }),

  tradeTime: {
    fontSize: SIZES.small + 2,
    fontFamily: "DMRegular",
    color: COLORS.white,
    marginTop: 3,
    textTransform: "capitalize",
  },
});

export default styles;
