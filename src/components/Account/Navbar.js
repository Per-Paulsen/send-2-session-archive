import { Toolbar, AppBar, Typography, Button, Box } from "@material-ui/core";
import { auth } from "../../firebase";

const Navbar = () => {
  return (
    <AppBar elevation={0} style={{color:"#FE8065"}} position="static">
      <Toolbar>
        <Typography variant="h5" style={{ color:"#fff"}}>SendToSession</Typography>
        <Box ml="auto">
          <Button style={{ color:"#fff"}}>Session-Stations</Button>
          <Button onClick={() => auth.signOut()} style={{ color:"#fff", textDecorationLine:"underline"}}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
