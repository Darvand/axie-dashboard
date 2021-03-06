import { DailyResponse } from "./daily";

export interface AccountResponse {
  scholar: {
    name: string;
  };
  id: string;
  roninAddress: string;
  roninSLP: number;
  inGameSLP: number;
  totalSLP: number;
  lifetimeSLP: number;
  mmr: number;
  rank: number;
  lastClaim: number;
  nextClaim: number;
  accountDaily: DailyResponse[];
}
