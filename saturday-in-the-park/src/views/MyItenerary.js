import React from "react";

function MyItinerary({ info, match }) {
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

export default MyItinerary;
