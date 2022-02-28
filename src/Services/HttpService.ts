/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { Summoner } from "../Models/Summoner";

// only change by Region
let protocol: string = "http://";
let genericUrl: string = "leagueabuser.localhost/api/";

const getPlayerByName = async (name: string): Promise<Summoner | undefined> => {
  try {
    const request = axios.get(`${buildBaseUrl("summoner")}${name}`);

    const response = await request;

    return await response.data.result;
  } catch (error) {
    console.log(error);
  }
};

const buildBaseUrl = (endpointUrl: string): string => {
  let completeUrl = `${protocol}${genericUrl}${endpointUrl}/`;

  return completeUrl;
};

export { getPlayerByName };
