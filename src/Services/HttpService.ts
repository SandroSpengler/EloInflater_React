/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";

// only change by Region
let protocol: string = "https://";
let regionUrl: string = "euw1.api.riotgames.com";
let genericUrl: string = "/lol/";

// changes for each endpoint
let enpointUrl: string = "";

const getPlayerByName = async (name: string) => {
  try {
    const request = axios.get(`${buildBaseUrl(regionUrl, "summoner/v4/summoners/by-name/")}${name}`, buildConfig());

    const response = await request;

    console.log(await response);
  } catch (error) {
    console.log(error);
  }
};

const buildBaseUrl = (regionUrl: string, endpointUrl: string): string => {
  let completeUrl = `${protocol}${regionUrl}${genericUrl}${endpointUrl}`;

  return completeUrl;
};

const buildConfig = (): any => {
  let config = {
    headers: {
      "X-Riot-Token": localStorage.getItem("API_KEY"),
    },
  };

  return config;
};

export { getPlayerByName };
