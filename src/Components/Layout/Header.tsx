import React, { useEffect } from "react";

import { useState } from "react";
import { AppBar, Box, Button, IconButton, Link, Toolbar } from "@mui/material";

import SearchBar from "../../Components/Tools/SearchBar";
import { useLocation } from "react-router-dom";

const Header = (props: any) => {
  const location = useLocation();

  const searchBarStyles: React.CSSProperties = {
    width: "200px",
    fontSize: "14px",
  };

  const [displaySearchBar, setDisplaySearchBar] = useState<boolean>(true);

  useEffect(() => {
    if (window.location.href.includes("/home")) {
      setDisplaySearchBar(false);
      return;
    }

    setDisplaySearchBar(true);
  }, [location.pathname]);

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar aria-label="Header" position="static" color="primary">
          <Toolbar
            variant="dense"
            style={{ height: 70, display: "flex", justifyContent: "space-between" }}
          >
            <div>
              <Link
                aria-label="Header_Home"
                href="/overview"
                underline="hover"
                style={{ color: "white", margin: 5 }}
              >
                Home
              </Link>
              {/* <Link href="/frontend" underline="hover" style={{ color: "white", margin: 5 }}>
                Page 1
              </Link>
              <Link href="/backend" underline="hover" style={{ color: "white", margin: 5 }}>
                Page 2
              </Link>
              <Link href="/devops" underline="hover" style={{ color: "white", margin: 5 }}>
                Page 3
              </Link> */}
            </div>
            {displaySearchBar ? <SearchBar styles={searchBarStyles} /> : ""}
          </Toolbar>
        </AppBar>
      </Box>
    </React.Fragment>
  );
};

export default Header;
