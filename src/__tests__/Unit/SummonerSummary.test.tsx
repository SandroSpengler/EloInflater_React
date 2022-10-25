import {render, screen, waitFor} from "@testing-library/react";

import {MemoryRouter} from "react-router-dom";

import SummonerSummary from "../../Pages/SummonerSummary";
import {startMSWServer, stopMSWServer} from "../../__utlis__/HttpEnpoints";

describe("SummonerSummary Component Tests", () => {
  beforeAll(() => {
    startMSWServer();
  });

  afterAll(() => {
    stopMSWServer();
  });

  it("SummonerSummary to exist", () => {
    const summonerSummary = <SummonerSummary />;
    const route: string = "/data/summoner/euw/";

    render(<MemoryRouter initialEntries={[route]}>{summonerSummary}</MemoryRouter>);

    expect(summonerSummary).toBeDefined();
  });

  fit("Displaying Summoner-Stats", async () => {
    const summonerSummary = <SummonerSummary />;
    const route: string = "/data/summoner/euw/Don%20Noway";

    // render(summonerSummary);

    await render(<MemoryRouter initialEntries={[route]}>{summonerSummary}</MemoryRouter>);

    await waitFor(async () => {
      expect(screen.getByText("Don")).toBeInTheDocument();

      // const exhaustCastCount = await screen.findByTitle("exhaustCastCount");

      // expect(exhaustCastCount).toHaveTextContent("125");

      // console.log(exhaustCastCount.textContent);
    });
  });
});
