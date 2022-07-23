import React from "react";

import { useState } from "react";
import { AppBar, Box, Button, IconButton, Link, Toolbar } from "@mui/material";

import SearchBar from "../../Components/Tools/SearchBar";

const Header = (props: any) => {
  const searchBarStyles: React.CSSProperties = {
    width: "450px",
    fontSize: "14px",
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="primary">
          <Toolbar variant="dense" style={{ height: 70, display: "flex", justifyContent: "space-between" }}>
            <div>
              <Link href="/overview" underline="hover" style={{ color: "white", margin: 5 }}>
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
            {window.location.href.includes("/overview") === true ? "" : <SearchBar styles={searchBarStyles} />}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Header;
