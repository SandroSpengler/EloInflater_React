import {MemoryRouter} from "react-router-dom";

import SearchBar from "../Components/Tools/SearchBar";

// User-Event -> Changes State
// Fire-Event -> Changes HTML-Elements
import {fireEvent, render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import nock from "nock";

describe("SerachBar Component Tests", () => {
  beforeAll(() => {
    if (
      process.env.REACT_APP_BASE_URL === undefined ||
      typeof process.env.REACT_APP_BASE_URL !== "string"
    ) {
      throw new Error("Environment variables not properly set/defined");
    }
  });

  it("Input-Text events", () => {
    const route = "/";
    const searchBar = <SearchBar styles={{width: "800px"}} />;

    render(<MemoryRouter initialEntries={[route]}>{searchBar}</MemoryRouter>);

    const summonerInput = screen.getByRole("textbox", {name: /Summoner Name/i});
    const searchButton = screen.getByRole("button", {name: /searchButton/i});

    expect(summonerInput).toHaveValue("");
    expect(searchButton).toBeDisabled();

    // Check if Empty enter Serach Shows Error PopUp

    userEvent.type(summonerInput, "Test User");

    expect(summonerInput).toHaveValue("Test User");
    expect(searchButton).toBeEnabled;
  });

  it("Searching User", () => {
    const route = "/";
    const searchBar = <SearchBar styles={{width: "800px"}} />;

    render(<MemoryRouter initialEntries={[route]}>{searchBar}</MemoryRouter>);

    const summonerInput = screen.getByRole("textbox", {name: /Summoner Name/i});
    const searchButton = screen.getByRole("button", {name: /searchButton/i});

    const scope = nock(process.env.REACT_APP_BASE_URL as string);

    expect(summonerInput).toHaveValue("");

    userEvent.type(summonerInput, "{enter}");
  });
});
