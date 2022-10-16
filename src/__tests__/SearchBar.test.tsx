import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import SearchBar from "../Components/Tools/SearchBar";

describe("App Component Tests", () => {
  it("App to exist", () => {
    const route = "/";
    const searchBar = <SearchBar styles={{ width: "800px" }} />;

    render(<MemoryRouter initialEntries={[route]}>{searchBar}</MemoryRouter>);

    screen.getByRole("");
  });
});
