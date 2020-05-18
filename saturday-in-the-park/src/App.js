import React from "react";
import { Switch, Route } from "react-router-dom";
import {
  Home,
  Login,
  Logout,
  Register,
  MyItenerary,
  IteneraryForm,
} from "./views";

import { Footer, Navbar } from "./components";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/myitinerary" component={MyItenerary} />
        <Route exact path="/myitinerary/new" component={IteneraryForm} />
        <Route
          path="/myitinerary/:itinerary_id/edit"
          component={IteneraryForm}
        />
        <Route path="/" component={Home} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
