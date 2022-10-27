import {act, findByText, render, screen, waitFor} from "@testing-library/react";

import {createMemoryRouter, MemoryRouter, Route, Routes} from "react-router-dom";
import {createMemoryHistory} from "history";

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
    const history = createMemoryHistory();
    const summonerSummary = <SummonerSummary />;
    const route: string = "/data/summoner/euw/Don%20Noway";

    history.push(route);

    render(
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/data/summoner/:region/:summonerName" element={summonerSummary}></Route>
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      const matchesText = screen.getByText("Matches checked");

      expect(matchesText).toBeDefined();
    });

    const exhaustCount = screen.getByText("29");
    expect(exhaustCount).toBeDefined();

    // screen.debug();
  });
});
