import { DateTime, Interval } from "luxon";
import { getNextFortnight } from "../helpers/time";
import { AccountSummary } from "../types/headers";

const INITIAL = {
  toPaySLP: 0,
  ownSLP: 0,
  expectedToPaySLP: 0,
  expectedOwnSLP: 0,
};

export const nextFortnightPayment = (accounts: AccountSummary[]) => {
  const payment = accounts.reduce((accum, account) => {
    const nextClaimDate = DateTime.fromFormat(account.nextClaim, "yyyy-MM-dd");
    const nextFortnight = getNextFortnight(nextClaimDate);
    if (nextClaimDate > nextFortnight) {
      return accum;
    }
    const interval = Interval.fromDateTimes(DateTime.now(), nextFortnight);
    const daysLeftToPayment = interval.isValid ? interval.length("days") : 0;
    const expectedSLP =
      +account.inGameSLP + Math.ceil(daysLeftToPayment) * +account.averageSLP;
    return {
      toPaySLP: accum.toPaySLP + Number(account.nextPayment),
      ownSLP: accum.ownSLP + (+account.inGameSLP - +account.nextPayment),
      expectedToPaySLP:
        accum.expectedToPaySLP + +expectedSLP * +account.paymentProportion,
      expectedOwnSLP:
        accum.expectedOwnSLP + expectedSLP * (1 - +account.paymentProportion),
    };
  }, INITIAL);
  return {
    nextPaymentDate: getNextFortnight(DateTime.now()),
    nextPayment: payment,
  };
};
