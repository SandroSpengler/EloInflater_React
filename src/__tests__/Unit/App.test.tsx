import {render, screen} from "@testing-library/react";

import App from "../../App";

describe("App Component Tests", () => {
  it("App to exist", () => {
    render(<App />);

    expect(<App />).toBeDefined();
  });
});
