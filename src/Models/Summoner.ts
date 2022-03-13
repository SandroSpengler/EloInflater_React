export interface Summoner {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
  updatedAt: string;
  createdAt: string;
  matchList: MatchListEntry[];
}
export interface MatchListEntry {
  matchId: string;
  exhaustAbused: boolean;
  tabisAbused: boolean;
  _id: string;
  updatedAt: string;
  createdAt: string;
}
