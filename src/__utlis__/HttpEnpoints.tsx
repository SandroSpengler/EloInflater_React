import {rest} from "msw";
import {setupServer, SetupServerApi} from "msw/lib/node";
import {Summoner} from "../Models/Summoner";

const baseURL = process.env.REACT_APP_BASE_URL as string;

const setUpMSWServer = (): SetupServerApi => {
  const server = setupServer();

  server.use(
    rest.get(`${baseURL}/api/data/summoner/:userName`, (req, res, ctx) => {
      return res(ctx.json(summonerBeforeUpdate()));
    }),
  );
  server.use(
    rest.put(`${baseURL}/api/refresh/match/:matchId`, (req, res, ctx) => {
      return res(ctx.json(summonerAfterUpdate()));
    }),
  );

  return server;
};

const server = setUpMSWServer();

const startMSWServer = (): void => {
  if (
    process.env.REACT_APP_BASE_URL === undefined ||
    typeof process.env.REACT_APP_BASE_URL !== "string"
  ) {
    throw new Error("Environment variables not properly set/defined");
  }

  server.listen();
};

const stopMSWServer = (): void => {
  server.close();
};

/**
 * Provides the JSON for the SummonerData for testing
 *
 * @returns Summoner
 */
const summonerBeforeUpdate = (): Summoner => {
  const summoner = {
    id: "3CbbfMEj8HuBGXGj2tNZIwRVTqv-ByZsP7sNKMfAZzVJ-cQ",
    summonerId: "3CbbfMEj8HuBGXGj2tNZIwRVTqv-ByZsP7sNKMfAZzVJ-cQ",
    accountId: "uQxQ8q5_iWzsNoVNNB3bFIxQKSTs078XmfJm7XWt1oYZXA",
    puuid: "jwBHleqKdQIJc4Iz7WYc5ZhWG9Uf-no-1RsLyxnB79UXpKW877SsHvWdMfGYcxBDCLMIGTq2C5z9rQ",
    name: "Don Noway",
    profileIconId: 586,
    revisionDate: 1657576015000,
    summonerLevel: 513,
    leaguePoints: 1460,
    rank: "I",
    wins: 498,
    losses: 414,
    rankSolo: "CHALLENGER",
    veteran: true,
    inactive: false,
    freshBlood: false,
    hotStreak: false,
    exhaustCount: 29,
    exhaustCastCount: 125,
    zhonaysCount: 159,
    zhonaysCastCount: 0,
    tabisCount: 42,
    updatedAt: 1666472768321,
    lastMatchUpdate: 1666439923070,
    uninflatedMatchList: [
      "EUW1_5719815682",
      "EUW1_5782762281",
      "EUW1_5782658595",
      "EUW1_5723924098",
      "EUW1_5710227574",
      "EUW1_5721290766",
    ],
    inflatedMatchList: [
      "EUW1_6043283026",
      "EUW1_6043234605",
      "EUW1_6042886563",
      "EUW1_6042425460",
      "EUW1_6038153484",
      "EUW1_6108354228",
      "EUW1_6109967482",
    ],
  };
  return summoner;
};

/**
 * Provides the JSON for the SummonerData for testing
 *
 * @returns Summoner
 */
const summonerAfterUpdate = (): Summoner => {
  const summoner = {
    id: "3CbbfMEj8HuBGXGj2tNZIwRVTqv-ByZsP7sNKMfAZzVJ-cQ",
    summonerId: "3CbbfMEj8HuBGXGj2tNZIwRVTqv-ByZsP7sNKMfAZzVJ-cQ",
    accountId: "uQxQ8q5_iWzsNoVNNB3bFIxQKSTs078XmfJm7XWt1oYZXA",
    puuid: "jwBHleqKdQIJc4Iz7WYc5ZhWG9Uf-no-1RsLyxnB79UXpKW877SsHvWdMfGYcxBDCLMIGTq2C5z9rQ",
    name: "Don Noway",
    profileIconId: 586,
    revisionDate: 1657576015000,
    summonerLevel: 600,
    leaguePoints: 1000,
    rank: "I",
    wins: 550,
    losses: 500,
    rankSolo: "CHALLENGER",
    veteran: true,
    inactive: false,
    freshBlood: false,
    hotStreak: false,
    exhaustCount: 80,
    exhaustCastCount: 201,
    zhonaysCount: 189,
    zhonaysCastCount: 0,
    tabisCount: 83,
    updatedAt: 1666472769876,
    lastMatchUpdate: 1666439929876,
    uninflatedMatchList: [
      "EUW1_5719815682",
      "EUW1_5782762281",
      "EUW1_5782658595",
      "EUW1_5723924098",
      "EUW1_5710227574",
      "EUW1_5721290766",
    ],
    inflatedMatchList: [
      "EUW1_6043283026",
      "EUW1_6043234605",
      "EUW1_6042886563",
      "EUW1_6042425460",
      "EUW1_6038153484",
      "EUW1_6108354228",
      "EUW1_6109967482",
    ],
  };
  return summoner;
};

export {startMSWServer, stopMSWServer, summonerBeforeUpdate, summonerAfterUpdate};
