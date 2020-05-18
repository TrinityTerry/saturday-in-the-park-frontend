import React from "react";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/myitinerary" component={MyItenerary} />
      <Route exact path="/myitinerary/new" component={ItenaryForm} />
      <Route path="/myitinerary/:itinerary_id/edit" component={ItenaryForm} />
      <Route path="/" component={Home} />
    </Switch>
  );
}

function Home() {
  return (
    <h2>
      When the user navigates to the root url, they should see a list of park
      areas with the attractions in that park area listed under it.
    </h2>
  );
}

function Login() {
  return (
    <h2>
      When the user navigates to /login, they should be presented with a form
      that allows them to log in to the application
    </h2>
  );
}
function Logout() {
  return (
    <h2>
      When the user navigates to /logout, they should be logged out of the
      application
    </h2>
  );
}

function Register() {
  return (
    <h2>
      When the user navigates to /register, they should be presented with a form that allows them to register as a new user.
    </h2>
  );
}

function MyItenerary() {
  return (
    <h2>
      When the user navigates to /myitinerary, they should see a list of
      itinerary items specific to that user.
    </h2>
  );
}

function ItenaryForm({ info, match }) {
  return (
    <h2>
      {" "}
      {match.params.itinerary_id
        ? `Edit form for ${match.params.itinerary_id} `
        : "New Form"}{" "}
      When the user navigates to /myitinerary/new, they should be presented with
      a form that, when submitted, will add a new item to their itinerary.
    </h2>
  );
}

export default App;
