import axios, {AxiosError} from "axios";
import {MatchData} from "../Models/MatchData";
import {Summoner} from "../Models/Summoner";

// only change by Region
let data: string = "data/";
let refresh: string = "refresh/";

const getSummonerByName = async (name: string): Promise<Summoner> => {
  try {
    const request = axios.get<Summoner, any>(`${buildBaseUrl(data, "summoner")}${name}`);

    const response = await request;

    return await response.data;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      // console.log(error);
    }

    throw error;
  }
};

/**
 * Update Summoner Matches and Information
 *
 *
 */
const putUpdateMatchesBySummonerId = async (
  summonerId: string,
): Promise<{
  success: boolean;
  result: Summoner | null;
  error: null | string;
}> => {
  try {
    const request = axios.put(`${buildBaseUrl(refresh, "match")}${summonerId}`);

    const response = await request;

    return await response.data;
  } catch (error: any | AxiosError) {
    throw error;
  }
};

const buildBaseUrl = (action: string, endpointUrl: string): string => {
  if (process.env.REACT_APP_BASE_URL === undefined) {
    throw new Error("Please provide a valid URL");
  }

  const baseUrl = process.env.REACT_APP_BASE_URL;

  let completeUrl = `${baseUrl}/api/${action}${endpointUrl}/`;

  return completeUrl;
};

export {getSummonerByName, putUpdateMatchesBySummonerId};
