import { DateTime, Interval } from "luxon";
import { Account } from "../types/account";
import { Daily } from "../types/daily";
import { AccountSummary } from "../types/headers";
import { getPaymentProportion } from "./paymentRules";

const EXCEPTIONS = [
  "ronin:e75ef6516e8212d30ffec47eb46798c3a33d1d12",
  "ronin:a93a5b0731c657fc5573643aee76a85398a1608a",
];

export const calculateDaily = (
  account: Account,
  daily: Daily[]
): AccountSummary => {
  const lastClaim = DateTime.fromMillis(account.lastClaim * 1000);
  const nextClaim = DateTime.fromMillis(account.nextClaim * 1000);
  const intervalBetweenClaims = Interval.fromDateTimes(
    lastClaim,
    DateTime.now()
  );
  const dailyCount = daily.length;
  const daysBetweenClaims = Math.ceil(intervalBetweenClaims.length("days"));
  const totalSLPBetweenClaims = daily
    .slice(
      daysBetweenClaims > dailyCount ? 0 : dailyCount - daysBetweenClaims,
      dailyCount
    )
    .reduce((accum, current) => accum + current.daySLP, 0);
  const averageSLPBetweenClaims = totalSLPBetweenClaims / daysBetweenClaims;
  const paymentProportion = EXCEPTIONS.includes(account.roninAddress)
    ? 0.5
    : getPaymentProportion(averageSLPBetweenClaims);
  const address = account.roninAddress.replace("ronin:", "");
  return {
    ronin: `${address.substring(0, 4)}...${address.substring(
      address.length - 5,
      address.length
    )}`,
    scholarship: "Scholarship",
    roninSLP: account.roninSLP,
    inGameSLP: account.inGameSLP,
    lifetimeSLP: account.lifetimeSLP + account.inGameSLP,
    mmr: account.mmr,
    averageSLP: Math.floor(averageSLPBetweenClaims),
    yesterdaySLP: daily.at(-1)?.daySLP || 0,
    paymentProportion: paymentProportion,
    nextPayment: Math.floor(account.inGameSLP * paymentProportion),
    lastClaim: lastClaim.toFormat("yyyy-MM-dd"),
    nextClaim: nextClaim.toFormat("yyyy-MM-dd"),
  };
};
