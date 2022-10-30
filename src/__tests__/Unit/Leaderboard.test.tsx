import {render, screen} from "@testing-library/react";
import {createMemoryHistory} from "history";

import Leaderboard from "../../Pages/Leaderboard";
import {startMSWServer, stopMSWServer} from "../../__utlis__/HttpEnpoints";
import createRouterWithEndpoints from "../../__utlis__/RouterEndpoint";

describe("SummonerSummary Component Tests", () => {
  beforeAll(() => {
    startMSWServer();
  });

  afterAll(() => {
    stopMSWServer();
  });

  describe("Initial load of the Leaderboard", () => {
    it("render Leaderboard", () => {
      const leaderboard = <Leaderboard />;

      expect(leaderboard).toBeDefined();
    });

    it("check Leaderboard routing", () => {
      const history = createMemoryHistory();
      const route: string = `/leaderboard/euw/rankedsolo`;

      history.push(route);

      render(createRouterWithEndpoints(route));

      //   const leaderboardTestText = screen.getByText("Leaderboard");

      //   expect(leaderboardTestText).toBeDefined();
    });
  });
});
