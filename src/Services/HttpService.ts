/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosError } from "axios";
import { Summoner } from "../Models/Summoner";
// only change by Region

let protocol: string;
let genericUrl: string;

if (process.env.NODE_ENV === "development") {
  protocol = "http://";
  genericUrl = "leagueabuser.localhost/api/";
} else {
  protocol = "https://";
  genericUrl = "leagueabuser.axfert.com/api/";
}

const getPlayerByName = async (name: string): Promise<Summoner> => {
  try {
    const request = axios.get(`${buildBaseUrl("summoner")}${name}`);

    const response = await request;

    return await response.data.result;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      // console.log(error);
    }

    throw error;
  }
};

const buildBaseUrl = (endpointUrl: string): string => {
  let completeUrl = `${protocol}${genericUrl}${endpointUrl}/`;

  return completeUrl;
};

export { getPlayerByName };
