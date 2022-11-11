import {createMemoryHistory} from "history";
import {MemoryRouter} from "react-router-dom";

import SearchBar from "../../Components/Tools/SearchBar";

// User-Event -> Changes State
// Fire-Event -> Changes HTML-Elements
import {render, screen, waitFor} from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import {startMSWServer, stopMSWServer, summonerBeforeUpdate} from "../../__utlis__/HttpEnpoints";
import createRouterWithEndpoints from "../../__utlis__/RouterEndpoint";

describe("SerachBar Component Tests", () => {
  beforeAll(() => {
    startMSWServer();
  });

  afterAll(() => {
    stopMSWServer();
  });

  it("Input-Text events", async () => {
    const route = "/";
    const user = userEvent.setup();
    const searchBar = <SearchBar styles={{width: "800px"}} />;

    render(<MemoryRouter initialEntries={[route]}>{searchBar}</MemoryRouter>);

    const summonerInput = screen.getByRole("textbox", {name: /Summoner Name/i});
    const searchButton = screen.getByRole("button", {name: /searchButton/i});

    expect(summonerInput).toHaveValue("");
    expect(searchButton).toBeDisabled();

    await user.type(summonerInput, "Test User");

    expect(summonerInput).toHaveValue("Test User");
    expect(searchButton).toBeEnabled;
  });

  // ToDo
  // Valdiate Navigation including the Header
  it("Searching User on Home Page", async () => {
    const summoner = summonerBeforeUpdate();
    const user = userEvent.setup();
    const history = createMemoryHistory();
    const route: string = "/";

    history.push(route);

    render(createRouterWithEndpoints(route));

    const summonerInput = screen.getByRole("textbox", {name: /Summoner Name/i});

    expect(summonerInput).toHaveValue("");

    await user.type(summonerInput, `${summoner.name}{enter}`);

    await waitFor(() => {
      const matchesText = screen.getByText("Matches checked");

      expect(matchesText).toBeDefined();
    });
  });
});
