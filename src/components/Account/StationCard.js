import { memo } from "react";
import { Typography, Button, Box, Hidden } from "@material-ui/core";
//import { BarChart as ChartIcon } from "@material-ui/icons";
// import format from "date-fns/format";

const StationCard = ({
  id,
  // createdAt,
  name,
  // longURL,
  CodeSession,
  CodeCustomer,
  totalClicks,
  deleteStation,
  copyStationSession,
  copyStationCustomer
}) => {
  const UrlSession = `https://${window.location.host}/station/url/${CodeSession}`;
  const UrlCustomer = `https://${window.location.host}/station/customer/${CodeCustomer}`;
  return (
    <Box display="flex" justifyContent="space-between">
      <Box>
        {/* <Typography color="textSecondary" variant="overline">
          Created at {format(createdAt, "d MMM, HH:mm")}
        </Typography> */}
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography style={{ marginBottom: "5px", color:"#secondary"}} variant="h5">
              {name}
            </Typography>
          </Box>
          <Box >
            <Button
                onClick={() => deleteStation(id)}
                color="#fff"
                size="small"
                variant="outlined"
                // disableElevation
              >
                Delete
            </Button>
          </Box>
          <Box>

          </Box>
        </Box>
        <Box>
          <Typography style={{ overflow: "hidden", textOverflow: "ellipsis", marginBottom: "10px", marginTop: "10px" }}>
            URL-Station
          </Typography>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography style={{color:"#FE8065"}}>{UrlSession}</Typography>
            <Box mx={2}>
              <Button
                onClick={() => copyStationSession(UrlSession)}
                style={{ color: "#fff", backgroundColor: "#FE8065"}}
                size="small"
                variant="contained"
              >
                Copy
              </Button>
            </Box>
          </Box>
        </Box>
        <Box>
          <Typography style={{ overflow: "hidden", textOverflow: "ellipsis", marginTop: "20px", marginBottom: "10px" }}>
            Customer-Station
          </Typography>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography style={{color:"#FE8065"}}>{UrlCustomer}</Typography>
            <Box mx={2}>
              <Button
                onClick={() => copyStationCustomer(UrlCustomer)}
                style={{ color: "#fff", backgroundColor: "#FE8065"}}
                size="small"
                variant="contained"
              >
                Copy
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box>
        {/* <Box display="flex" justifyContent="center">
          <Typography>{totalClicks}</Typography>
          <ChartIcon/>
        </Box> */}
        <Hidden only="xs">
          <Typography variant="overline" style={{ color: "#secondary"}}>Sends to Session: {totalClicks}</Typography>
        </Hidden>
      </Box>
    </Box>
  );
};

export default memo(StationCard);
