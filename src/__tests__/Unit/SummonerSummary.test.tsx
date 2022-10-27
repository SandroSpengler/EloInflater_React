import {act, findByText, render, screen, waitFor} from "@testing-library/react";

import {createMemoryRouter, MemoryRouter, Route, Routes} from "react-router-dom";
import {createMemoryHistory} from "history";

import SummonerSummary from "../../Pages/SummonerSummary";
import {startMSWServer, stopMSWServer} from "../../__utlis__/HttpEnpoints";
import createRouterWithEndpoints from "../../__utlis__/RouterEndpoint";

describe("SummonerSummary Component Tests", () => {
  beforeAll(() => {
    startMSWServer();
  });

  afterAll(() => {
    stopMSWServer();
  });

  it("Displaying Summoner-Stats", async () => {
    const history = createMemoryHistory();

    const route: string = "/data/summoner/euw/Don%20Noway";

    history.push(route);

    render(createRouterWithEndpoints(route));

    await waitFor(() => {
      const matchesText = screen.getByText("Matches checked");

      expect(matchesText).toBeDefined();
    });

    const exhaustCount = screen.getByText("29");
    expect(exhaustCount).toBeDefined();

    // screen.debug();
  });
});
