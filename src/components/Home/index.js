import { useState } from "react";
import { Hidden, Typography, Button, Box, Grid } from "@material-ui/core";
import AuthModal from "./AuthModal";

const Home = () => {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  return (
    <Box
      display="flex"
      flexDirection="column"
      px={6}
      pb={6}
      pt={4}
      boxSizing="border-box"
      height="100vh"
      bgcolor="#FE8065"
      color="#fff"
    >
      {openAuthModal && <AuthModal onClose={() => setOpenAuthModal(false)} />}
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h4">SendToSession</Typography>
          <Button onClick={() => setOpenAuthModal(true)} color="inherit" style={{textDecorationLine:"underline"}}>
            Login
          </Button>
      </Box>
      
      <Box display="flex" flexGrow={1} alignItems="center" mt={4}>
        <Grid container alignItems="center" display="flex" justifyContent="space-between">
          <Hidden only="xs">
            <Grid item sm={5}>
              <img
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  // boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
                }}
                src="/assets/SendToSession.png"
                alt="mockup"
              />
            </Grid>
          </Hidden>
          <Grid item sm={1}>
          </Grid>
          <Grid item sm={6}>
            <Box>
              <Typography variant="h3">Send Customers to Sessions</Typography>
              <Box my={2}>
                <Typography>
                  Forward session URL and customer to Session Station, to redirect customer to URL.
                </Typography>
              </Box>
              <Button
                onClick={() => setOpenAuthModal(true)}
                // disableElevation
                variant="contained"
                size="large"
                style={{ color: "#FE8065", backgroundColor: "#fff"}}
              >
                Try it Out
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box my={6}>
        <Typography variant="h4">How it Works</Typography>
        <Box my={2}>
          <Typography variant="h5">
          Stripe Checkout Session Example with Zapier
          </Typography>
        </Box>
        <Box my={1}>
          <Typography>
            Create Stripe Checkout Session in Zapier and obtain session URL. In same Zap, forward URL to Session Station (POST request with "session_url" body parameter).       
          </Typography>
        </Box>
        <Box my={1}>
          <Typography>
          Trigger Zap on customer interaction with your website, e.g., via webhook. Simultaneously, redirect customer to same Session Station to send to session URL.
          </Typography>
        </Box>     
      </Box>
    </Box>
  );
};

export default Home;
