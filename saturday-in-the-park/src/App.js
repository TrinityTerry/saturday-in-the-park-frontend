import React, { useState, useEffect } from "react";
import { Switch, Route, Link, Redirect, useHistory } from "react-router-dom";
import { Home, Login, Register, MyItenerary, IteneraryForm } from "./views";
import { DataManager } from "./modules";

import { Footer, Navbar } from "./components";

function App() {
  const [user, setUser] = useState({
    first: "First Name",
    last: "Last Name",
    email: "Email",
    id: 0,
    is_staff: false,
    token: "",
  });

  const history = useHistory();
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
      window.sessionStorage.removeItem("usertoken");
      history.push("/");
      getUserInfo();
    });
  }, []);

  return (
    <>
      {user ? (
        <>
          <Navbar user={user} />
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
              exact
              path="/signout"
              render={() => <Logout user={user} getUserInfo={getUserInfo} />}
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

function Logout({ user, getUserInfo }) {
  const history = useHistory();
  useEffect(() => {
    if (user) {
      DataManager.signoutUser({ token: user.token }).then((resp) => {
        window.sessionStorage.removeItem("usertoken");
        history.push("/");
        getUserInfo();
      });
    }
  }, [user]);
  return "<h1>Signout</h1>";
}

export default App;
