import { DailyResponse } from "./daily";

export interface AccountResponse {
  id: string;
  roninAddress: string;
  accountDaily: DailyResponse[];
}
