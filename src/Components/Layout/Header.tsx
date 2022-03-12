import React from "react";

import { useState } from "react";
import { AppBar, Box, Button, IconButton, Link, Toolbar } from "@mui/material";

let apikey = localStorage.getItem("API_KEY");

const Header = (props: any) => {
  // const changeApiKey = () => {
  //   apikey = prompt("Enter API Key");

  //   apikey ? localStorage.setItem("API_KEY", apikey) : localStorage.setItem("API_KEY", "");
  // };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: "#10162b" }}>
          <Toolbar
            variant="dense"
            color="secondary"
            style={{ height: 60, display: "flex", justifyContent: "space-between" }}
          >
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
            <div>
              {/* <Button variant="contained" color="primary" onClick={() => changeApiKey()}>
                Change Api-Key
              </Button> */}
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Header;
