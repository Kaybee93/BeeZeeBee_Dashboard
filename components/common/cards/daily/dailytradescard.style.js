import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: "#4f4f4f",
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
  arrowImage: {
    width: "50%",
    height: "50%",
  },
  investContainer2: {
    flex: 1,
    flexDirection: "row",
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: SIZES.medium,
  },
  jobName: {
    fontSize: SIZES.medium,
    fontFamily: "DMBold",
    color: '#FFF',
  },
  tradeInvest: {
    textAlign: "right",
    fontSize: SIZES.medium,
    fontFamily: "DMBold",
    color: '#FFF',
  },
  tradeProfit: (item) => ({
    textAlign: "right",
    fontSize: SIZES.medium,
    fontFamily: "DMBold",
    color: item > 0? COLORS.green : item < 0? COLORS.red : '#FFF',
  }),
  investContainer: {
    flex: 1,
  },
  jobType: {
    fontSize: SIZES.small + 2,
    fontFamily: "DMRegular",
    color: COLORS.gray,
    marginTop: 3,
    textTransform: "capitalize",
  },
});

export default styles;
