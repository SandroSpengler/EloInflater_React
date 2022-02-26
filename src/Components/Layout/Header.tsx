import { useState } from "react";

import { AppBar, Box, IconButton, Link, Toolbar } from "@mui/material";

const Header = (props: any) => {
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
              <Link href="/home" underline="hover" style={{ color: "white", margin: 5 }}>
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
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Header;
