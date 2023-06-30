import { StyleSheet } from "react-native";

import { FONT, SIZES, icons, COLORS } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.xSmall,
    backgroundColor: COLORS.darkGray,
    borderRadius: SIZES.small,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.white,
  },
  accountHeader: {
    alignItems: "center"
  },
  headerBtn: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.gray,
  },
  cardsContainer: {
    marginTop: SIZES.xSmall,
    marginBottom: SIZES.large,
    marginEnd: SIZES.xLarge,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headline: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 0,
    width: 200,
  },
  centerContainer: {
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabsContainer: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 10
  },
  imageStop: {
    iconUrl: icons.stop,
  },
  imageStart: {
    iconUrl: icons.start,
  },
  rsiText: {
    fontWeight: 'bold'
  },
  headerSignal: {
    marginTop: 15,
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.white,
  },
  headerAccount: (item) => ({
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 35,
    color: item === "PRACTICE" ? COLORS.orange : COLORS.green,
    alignItems: 'center'
  }),
  tab: (activeJobType, item) => ({
    paddingVertical: SIZES.small / 2,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.medium,
    borderWidth: 1,
    backgroundColor: activeJobType === item ? COLORS.orange : COLORS.gray2,
    borderColor: activeJobType === item ? COLORS.orange : COLORS.gray2,
  }),
  tabText: (activeJobType, item) => ({
    fontFamily: FONT.medium,
    color: activeJobType === item ? COLORS.lightWhite : COLORS.darkGray,
  }),
});

export default styles;
