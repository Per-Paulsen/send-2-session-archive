import { useState, useEffect } from "react";
import { ThemeProvider, CircularProgress, Box } from "@material-ui/core";
import { Route, Redirect, Switch, useLocation } from "react-router-dom";
import Account from "./components/Account";
import Home from "./components/Home";
import { auth } from "./firebase";
import theme from "./theme";
//import LinkRedirect from "./components/LinkRedirect";

const App = () => {
  const [user, setUser] = useState(null);
  const { pathname } = useLocation();
  const [initialLoad, setInitialLoad] = useState(
    pathname === "/" || pathname === "/account" ? true : false
  );

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setInitialLoad(false);
    });
  }, []);

  if (initialLoad)
    return (
      <Box mt={5} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route exact path="/">
          {user ? <Redirect to="/account" /> : <Home />}
        </Route>
        <Route path="/account">
          {user ? <Account /> : <Redirect to="/" />}
        </Route>
      </Switch>
    </ThemeProvider>
  );
};

export default App;
