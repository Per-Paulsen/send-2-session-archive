import { useState } from "react";
import {
  Dialog,
  Box,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Typography,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import { auth } from "../../firebase";
import { Close as CloseIcon } from "@material-ui/icons";

const AuthModal = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSignIn, setIsSignIn] = useState(true);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) =>
    setForm((oldForm) => ({
      ...oldForm,
      [event.target.name]: event.target.value,
    }));

  const handleAuth = async () => {
    setLoading(true);
    try {
      if (isSignIn) {
        await auth.signInWithEmailAndPassword(form.email, form.password);
      } else {
        await auth.createUserWithEmailAndPassword(form.email, form.password);
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  return (
    <Dialog open onClose={onClose} PaperProps={{style: {borderRadius: 8}}}>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h5" style={{ color: "#FE8065"}}>
            {isSignIn ? "Login" : "Register"}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <TextField
          autoComplete={false}
          style={{ marginBottom: "24px" }}
          // variant="filled"
          fullWidth
          value={form.email}
          name="email"
          onChange={handleChange}
          label="Email"
        />
        <TextField
          // variant="filled"
          fullWidth
          value={form.password}
          name="password"
          onChange={handleChange}
          label="Password"
        />
        <Box mt={2} color="red">
          <Typography>{error}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
          mx={2}
        > 
          <Box display="flex" alignItems="center">
            <Typography>
              {isSignIn ? "No account yet?" : "Already have account?"}
            </Typography>
            <Box ml={2}>
              <Button onClick={() => setIsSignIn((o) => !o)} style={{textDecorationLine:"underline"}}>
                {isSignIn ? "Register instead" : "Login instead"}
              </Button>
            </Box>
          </Box>
          <Button
            // disableElevation
            variant="contained"
            style={{ color: "#fff", backgroundColor: "#FE8065"}}
            onClick={handleAuth}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress color="inherit" size={22} />
            ) : isSignIn ? (
              "Login"
            ) : (
              "Register"
            )}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default AuthModal;
