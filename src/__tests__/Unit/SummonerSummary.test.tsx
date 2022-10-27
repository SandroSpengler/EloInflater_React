import {render, screen, waitFor} from "@testing-library/react";

import {createMemoryHistory} from "history";

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
    const exhaustCastedCount = screen.getByText("125");
    const tabisCount = screen.getByText("42");
    const zhonaysCount = screen.getByText("159");

    expect(exhaustCount).toBeDefined();
    expect(exhaustCastedCount).toBeDefined();
    expect(tabisCount).toBeDefined();
    expect(zhonaysCount).toBeDefined();
  });
});
