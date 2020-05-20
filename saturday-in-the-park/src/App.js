import React, { useState, useEffect } from "react";
import { Switch, Route, Link, Redirect, useHistory } from "react-router-dom";
import {
  Home,
  Login,
  Logout,
  Register,
  MyItenerary,
  IteneraryForm,
} from "./views";
import { DataManager } from "./modules";

import { Footer, Navbar } from "./components";

function App() {
  const [user, setUser] = useState(null);
  const history = useHistory()
  const getUserInfo = () => {
    const token = JSON.parse(window.sessionStorage.getItem("usertoken"));
    if (token) {
      DataManager.getUserInfo({ token: token }).then(setUser);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    getUserInfo();

    window.addEventListener("storage", (e) => {
      window.sessionStorage.removeItem("usertoken")
      history.push("/")
      getUserInfo()
    })
  }, []);
  return (
    <>
      {user ? (
        <>
          <Navbar user={user} />
          <Switch>
            <Route
              exact
              path="/logout"
              render={() => <Logout getUserInfo={getUserInfo} />}
            />
            <Route
              exact
              path="/myitinerary"
              render={() => <MyItenerary user={user} />}
            />
            <Route
              exact
              path="/myitinerary/new"
              render={() => <IteneraryForm user={user} />}
            />
            <Route
              exact
              path="/myitinerary/:itinerary_id/edit"
              render={() => <IteneraryForm user={user} />}
            />
            <Route exact path="/" render={() => <Home user={user} />} />

            <Redirect to="/" />
          </Switch>
        </>
      ) : (
        <Switch>
          <Route
            exact
            path="/login"
            render={() => <Login getUserInfo={getUserInfo} />}
          />
          <Route
            exact
            path="/register"
            render={() => <Register getUserInfo={getUserInfo} />}
          />
          <Route
            path="/"
            exact
            render={() => (
              <Home
                noUserNav={
                  <Link to="/login">
                    <h1>Signin</h1>
                  </Link>
                }
              />
            )}
          />
          <Redirect to="/" />
        </Switch>
      )}

      <Footer />
    </>
  );
}

function Attraction({ match }) {
  return <h1>Look at the attraction with the id of {match.params.id}</h1>;
}
export default App;
