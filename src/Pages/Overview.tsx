// import { Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import { Button } from "@mui/material";

const Overview = (props: any) => {
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
