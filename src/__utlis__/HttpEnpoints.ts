import {rest} from "msw";
import {setupServer, SetupServerApi} from "msw/lib/node";

const baseURL = process.env.REACT_APP_BASE_URL as string;

const setUpMSWServer = (): SetupServerApi => {
  return setupServer(
    rest.get(`${baseURL}/api/data/summoner/:userName`, (req, res, ctx) => {
      return res(
        ctx.json({
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
          exhaustCount: 29,
          exhaustCastCount: 125,
          zhonaysCount: 159,
          zhonaysCastCount: 0,
          tabisCount: 42,
          updatedAt: 1666472768321,
          lastMatchUpdate: 1666439923070,
        }),
      );
    }),
  );
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

export {startMSWServer, stopMSWServer};
