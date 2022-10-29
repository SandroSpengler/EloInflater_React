import {render, screen, waitFor} from "@testing-library/react";

import {createMemoryHistory} from "history";

import {startMSWServer, stopMSWServer, summonerBeforeUpdate} from "../../__utlis__/HttpEnpoints";
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
});
