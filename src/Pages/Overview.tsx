// import { Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import { Button } from "@mui/material";

const Overview = (props: any) => {
  //   const cardStyles = {
  //     backgroundColor: "#182333",
  //     color: "white",
  //     padding: "20px",
  //     width: {
  //       xs: "100%",
  //       lg: "100%",
  //     },
  //   };

  return (
    <div>
      <div>
        <p>Hello World</p>
        <Button
          variant="contained"
          // variant="outlined"
          color="primary"
          onClick={() => console.log("Clicked!")}
        >
          Click Me!
        </Button>
      </div>
    </div>
  );
};

export default Overview;
