import React, { useEffect, useState } from "react";
import { DataManager } from "../modules";
import Button from "@material-ui/core/Button";
import { CardGroup } from "../components";
import { useHistory } from "react-router-dom";

function MyItinerary({ user, match }) {
  const [itineraryItems, setItineraryItems] = useState([]);
  const history = useHistory();
  const getItineraries = () => {
    let things = DataManager.getItenerayWithAreaInfo(user).then((resp) => {
      console.log(resp);

      if (resp) {
        setItineraryItems(
          resp.map((item) => {
            return {
              imageurl: item.attraction.imageurl,
              title: `Attraction: ${item.attraction.name}`,
              meta: `Park: ${item.attraction.area.name}`,
              content: `Start Time: ${item.start_time}`,
              actions: "",
            };
          })
        );
      } else {
        setItineraryItems([
          {
            imageurl: "",
            title: `No Items in itenerary`,
            meta: ` `,
            content: ` `,
            actions: " ",
          },
        ]);
      }
    });
  };

  useEffect(() => {
    if (user.token) {
      getItineraries();
    }
  }, [user]);

  const handleClick = (e) => {
    const name = e.currentTarget.name;

    if (name == "new") {
      history.push("/myitinerary/new");
    }
  };

  return (
    <>
      <Button onClick={handleClick} name="new" variant="outlined">
        Add Item to Itinerary
      </Button>
      <CardGroup cardInfoArray={itineraryItems} />
    </>
  );
}

export default MyItinerary;
