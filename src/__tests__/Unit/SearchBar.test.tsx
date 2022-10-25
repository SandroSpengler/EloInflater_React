import {BrowserRouter, MemoryRouter, useLocation} from "react-router-dom";
import {createMemoryHistory} from "history";

import SearchBar from "../../Components/Tools/SearchBar";

// User-Event -> Changes State
// Fire-Event -> Changes HTML-Elements
import {fireEvent, render, screen, waitFor} from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import {rest} from "msw";
import {setupServer} from "msw/node";
import App from "../../App";
import {startMSWServer, stopMSWServer} from "../../__utlis__/HttpEnpoints";

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

  it("Searching User", async () => {
    const route = "/";
    const user = userEvent.setup();
    const searchBar = <SearchBar styles={{width: "800px"}} />;

    render(<App />);

    const summonerInput = screen.getByRole("textbox", {name: /Summoner Name/i});
    const searchButton = screen.getByRole("button", {name: /searchButton/i});

    expect(summonerInput).toHaveValue("");

    await user.type(summonerInput, `Don Noway{enter}`);

    expect(location.pathname).toContain("/data/summoner/euw");
  });
});
