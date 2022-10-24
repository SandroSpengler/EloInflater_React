import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";

import Home from "../../Pages/Home";

describe("Home Component Tests", () => {
  beforeAll(() => {
    const route = "/home";
    render(
      <MemoryRouter initialEntries={[route]}>
        <Home />
      </MemoryRouter>,
    );
  });

  it("to exist", async () => {
    expect(<Home />).toBeDefined();

    // expect(await screen.findByRole(""));
  });
});
