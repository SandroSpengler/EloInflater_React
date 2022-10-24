import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";

import SummonerSummary from "../../Pages/SummonerSummary";

describe("SummonerSummary Component Tests", () => {
  it("SummonerSummary to exist", () => {
    const summonerSummary = <SummonerSummary />;
    const route = "/data/summoner/euw/Don%20Noway";

    render(<MemoryRouter initialEntries={[route]}>{summonerSummary}</MemoryRouter>);

    expect(summonerSummary).toBeDefined();
  });
});
