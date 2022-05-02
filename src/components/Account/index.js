import { useState, Fragment, useEffect, useCallback, useMemo } from "react";
import {Grid, Box, Typography, Button, Divider, Snackbar, CircularProgress} from "@material-ui/core";
import Navbar from "./Navbar";
import StationCard from "./StationCard";
import URLModal from "./URLModal";
import { app, firestore, auth } from "../../firebase";
import { nanoid } from "nanoid";
import copy from "copy-to-clipboard";

const Account = () => {
  const [fetchingStations, setFetchingStations] = useState(true);
  const [newStationToastr, setNewStationToastr] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [stations, setStations] = useState([]);
  const userUid = auth.currentUser.uid;
  const stationsPathRef = useMemo(
    () => firestore.collection("users").doc(userUid).collection("stations"),
    [userUid]
  );

  // const handleCreateStation = async (name, longURL) => {
  const handleCreateStation = async (name) => {
    const station = {
      name,
      // longURL:
      //   longURL.includes("http://") || longURL.includes("https://")
      //     ? longURL
      //     : `http://${longURL}`,
      createdAt: app.firestore.FieldValue.serverTimestamp(),
      CodeSession: nanoid(),
      CodeCustomer: nanoid(),
      //session_url: "",
      totalClicks: 0,
    };

    const resp = await stationsPathRef.add(station);

    setStations((stations) => [
      ...stations,
      { ...station, createdAt: new Date(), id: resp.id },
      // { ...station, id: resp.id },
    ]);
    setOpenModal(false);
  };

  useEffect(() => {
    const fetchStations = async () => {
      const snapshot = await stationsPathRef.get();

      const tempStations = [];
      snapshot.forEach((doc) =>
        tempStations.push({
          ...doc.data(),
          id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
        })
      );
      setStations(tempStations);
      setFetchingStations(false);
    };

    fetchStations();
  }, [stationsPathRef]);

  const handleDeleteStation = useCallback(
    async (stationDocID) => {
      if (window.confirm("Do you want to delete the station?")) {
        await stationsPathRef.doc(stationDocID).delete();
        setStations((oldStations) =>
          oldStations.filter((station) => station.id !== stationDocID)
        );
      }
    },
    [stationsPathRef]
  );

  const handleCopyStationSession = useCallback((UrlSession) => {
    copy(UrlSession);
    setNewStationToastr(true);
  }, []);

  const handleCopyStationCustomer = useCallback((UrlCustomer) => {
    copy(UrlCustomer);
    setNewStationToastr(true);
  }, []);

  return (
    <Box >
      <Snackbar
        open={newStationToastr}
        onClose={() => setNewStationToastr(false)}
        autoHideDuration={2000}
        message="Station copied to the clipboard"
      />
      {openModal && (
        <URLModal
          createStation={handleCreateStation}
          handleClose={() => setOpenModal(false)}
        />
      )}
      <Navbar />
      <Box mt={{ xs: 3, sm: 5 }} px={2} pt={0} pb={8}>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={8}>
            <Box mb={3} display="flex">
              <Box mr={3}>
                <Typography variant="h4" style={{ color:"#secondary"}}>Session-Stations</Typography>
              </Box>
              <Button
                onClick={() => setOpenModal(true)}
                // disableElevation
                variant="contained"
                style={{ color: "#fff", backgroundColor: "#FE8065"}}
              >
                Add new
              </Button>
            </Box>
            <Box mb={2}>
              <Typography variant="h6" style={{marginBottom: "5px"}}>
              Send session-url to URL-Station
              </Typography>
              <Typography style={{ color:"grey"}}>
              {`(POST request with JSON body: {"session_url": "<session-url>", "session_id": "<session-id>"})`}
              </Typography>
            </Box>
            <Box >
              <Typography variant="h6" style={{marginBottom: "5px"}}>
              Send customer to Customer-Station
              </Typography>
              <Typography style={{ color:"grey"}}>
              {`(GET request with query string paramerter: session_id=<session-id>)`}
              </Typography>
            </Box>
            <Box my={4}>
              <Divider />
            </Box>
            {fetchingStations ? (
              <Box textAlign="center">
                <CircularProgress />
              </Box>
            ) : !stations.length ? (
              <Box textAlign="center">
                {/* <img
                  style={{
                    width: "225px",
                    height: "auto",
                    marginBottom: "24px",
                  }}
                  src="/assets/no_stations.svg"
                  alt="no stations"
                /> */}
                <Typography style={{ color:"#FE8065"}}>No Session Stations yet</Typography>
              </Box>
            ) : (
              stations
                .sort(
                  (prevStation, nextStation) =>
                    nextStation.createdAt - prevStation.createdAt
                )
                .map((station, idx) => (
                  <Fragment key={station.id}>
                    <StationCard
                      {...station}
                      deleteStation={handleDeleteStation}
                      copyStationSession={handleCopyStationSession}
                      copyStationCustomer={handleCopyStationCustomer}
                    />
                    {idx !== stations.length - 1 && (
                      <Box my={4}>
                        <Divider />
                      </Box>
                    )}
                  </Fragment>
                ))
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Account;
