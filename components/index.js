import ScreenHeaderBtn from "./common/header/ScreenHeaderBtn";

// home screen
import TradeOverview from "./home/t-overview/TradeOverview";
import AccountOverview from "./home/a-overview/AccountOverview";
import TradeView from "./home/trade/TradeView";
import DailyReport from "./home/daily/DailyReport";
import Target from "./home/target/Target";

// job details screen
import Company from "./jobdetails/company/Company";
import Report from "./jobdetails/report/Report";
import { default as JobTabs } from "./jobdetails/tabs/Tabs";
import { default as JobAbout } from "./jobdetails/about/About";
import { default as JobFooter } from "./jobdetails/footer/Footer";
import Specifics from "./jobdetails/specifics/Specifics";

// common
import NearbyJobCard from "./common/cards/overview/TradeOverviewCard";
import DailyTradesCard from "./common/cards/daily/DailyTradesCard";

export {
  ScreenHeaderBtn,
  TradeOverview,
  AccountOverview,
  Company,
  Report,
  Target,
  JobTabs,
  JobAbout,
  JobFooter,
  Specifics,
  TradeView,
  DailyReport,
  NearbyJobCard,
  DailyTradesCard
};
