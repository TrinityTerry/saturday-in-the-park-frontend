import React, { useEffect, useState } from "react";
import { DataManager } from "../modules";

import { CardGroup } from "../components";

function MyItinerary({ user, match }) {
  const [itineraryItems, setItineraryItems] = useState([]);

  const getItineraries = () => {
    let things = DataManager.getItenerayWithAreaInfo(user).then((resp) => {
      setItineraryItems(
        resp.map((item) => {
          console.log(item);

          return {
            imageurl: item.attraction.imageurl,
            title: `Attraction: ${item.attraction.name}`,
            meta: `Park: ${item.attraction.area.name}`,
            content: `Start Time: ${item.start_time}`,
            actions: "",
          };
        })
      );
    });
  };

  useEffect(() => {
    if (user.token) {
      getItineraries();
    }
  }, [user]);

  return (
    <>
      <CardGroup cardInfoArray={itineraryItems} />
    </>
  );
}

export default MyItinerary;
