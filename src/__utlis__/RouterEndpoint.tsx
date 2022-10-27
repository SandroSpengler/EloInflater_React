import {MemoryRouter, Route, Routes} from "react-router-dom";
import App, {routes} from "../App";

/**
 * Provides the MemoryRouter with Routes for Testing
 *
 * @param route inital starting route
 *
 * @returns the Memory Router with the App Routes
 */
const createRouterWithEndpoints = (route: string): React.ReactElement => {
  const MemoryRoute = <MemoryRouter initialEntries={[route]}>{routes()}</MemoryRouter>;

  return MemoryRoute;
};

export default createRouterWithEndpoints;
