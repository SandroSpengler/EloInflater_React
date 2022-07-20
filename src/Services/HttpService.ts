import axios, { AxiosError } from "axios";
import { MatchData } from "../Models/MatchData";
import { Summoner } from "../Models/Summoner";
// only change by Region

let protocol: string;
let genericUrl: string;
let data: string = "data/";
let refresh: string = "refresh/";

if (process.env.NODE_ENV === "development") {
  protocol = "https://";
  genericUrl = "eloinflater.axfert.com/api/";
  // genericUrl = "localhost:5000/api/";
} else {
  protocol = "https://";
  genericUrl = "eloinflater.axfert.com/api/";
}

const getSummonerByName = async (name: string): Promise<Summoner> => {
  try {
    const request = axios.get<Summoner, any>(`${buildBaseUrl(data, "summoner")}${name}`);

    const response = await request;

    return await response.data.result;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      // console.log(error);
    }

    throw error;
  }
};

/**
 * @param {string}  queueType - The Division of the Players e.g. Master
 * @param {string}  queueMode - The Mode of the Gameplay e.g. rankedsolo
 */
const getMatchesBySummonerName = async (summonerName: string): Promise<MatchData[]> => {
  // queueType challenger, grandmaster, master
  // queueMode

  try {
    const request = axios.get(`${buildBaseUrl(data, "match")}${summonerName}`);

    const response = await request;

    return await response.data.result;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      // console.log(error);
    }

    throw error;
  }
};

const buildBaseUrl = (action: string, endpointUrl: string): string => {
  let completeUrl = `${protocol}${genericUrl}${action}${endpointUrl}/`;

  return completeUrl;
};

export { getSummonerByName, getMatchesBySummonerName };
