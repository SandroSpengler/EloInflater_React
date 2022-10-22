export interface Summoner {
  id: string;
  summonerId: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
  leaguePoints: number;
  rank: string;
  rankSolo: string;
  wins: number;
  losses: number;
  veteran: boolean;
  inactive: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
  uninflatedMatchList: string[];
  inflatedMatchList: string[];
  exhaustCount: number;
  exhaustCastCount: number;
  tabisCount: number;
  zhonaysCount: number;
  zhonaysCastCount: number;
  lastMatchUpdate: number;
  updatedAt: number;
}
