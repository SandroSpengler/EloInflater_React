import {getByRole, render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {createMemoryHistory} from "history";

import {
  startMSWServer,
  stopMSWServer,
  summonerAfterUpdate,
  summonerBeforeUpdate,
} from "../../__utlis__/HttpEnpoints";
import createRouterWithEndpoints from "../../__utlis__/RouterEndpoint";

describe("SummonerSummary Component Tests", () => {
  beforeAll(() => {
    startMSWServer();
  });

  afterAll(() => {
    stopMSWServer();
  });

  describe("Summoner-Stats", () => {
    it("Initial displaying Summoner-Stats", async () => {
      const history = createMemoryHistory();
      const summoner = summonerBeforeUpdate();
      const route: string = `/data/summoner/euw/${summoner.name}`;

      history.push(route);

      render(createRouterWithEndpoints(route));

      await waitFor(() => {
        const matchesText = screen.getByText("Matches checked");

        expect(matchesText).toBeDefined();
      });

      const exhaustCount = screen.getByText(summoner.exhaustCount);
      const exhaustCastedCount = screen.getByText(summoner.exhaustCastCount);
      const tabisCount = screen.getByText(summoner.tabisCount);
      const zhonaysCount = screen.getByText(summoner.zhonaysCount);

      expect(exhaustCount).toBeDefined();
      expect(exhaustCastedCount).toBeDefined();
      expect(tabisCount).toBeDefined();
      expect(zhonaysCount).toBeDefined();
    });

    it("Update Summoner-Stats", async () => {
      const user = userEvent.setup();
      const history = createMemoryHistory();
      const summoner = summonerAfterUpdate();
      const route: string = `/data/summoner/euw/${summoner.name}`;

      history.push(route);

      render(createRouterWithEndpoints(route));

      await waitFor(() => {
        const matchesText = screen.getByText("Matches checked");

        expect(matchesText).toBeDefined();
      });

      const updateButton = screen.getByRole("button", {name: /update/i});

      await user.click(updateButton);

      await waitFor(() => {
        const exhaustCount = screen.getByText(summoner.exhaustCount);
        const exhaustCastedCount = screen.getByText(summoner.exhaustCastCount);
        const tabisCount = screen.getByText(summoner.tabisCount);
        const zhonaysCount = screen.getByText(summoner.zhonaysCount);

        expect(exhaustCount).toBeDefined();
        expect(exhaustCastedCount).toBeDefined();
        expect(tabisCount).toBeDefined();
        expect(zhonaysCount).toBeDefined();
      });
    });
  });
});
