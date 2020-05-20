import React, { useEffect, useState } from "react";
import { CardContainer } from "../components";
import { DataManager, MiscManager } from "../modules";
import { Link } from "react-router-dom";

const Home = () => {
  const [parks, setParks] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [parksandAttr, setParksandAttr] = useState([]);

  useEffect(() => {
    DataManager.getParkAreas().then(setParks);
    DataManager.getAttractions().then(setAttractions);
  }, []);

  useEffect(() => {
    if (parks.length !== 0 && attractions.length !== 0) {
      let newArray = [];
      parks.forEach((park) => {
        let newObj = {
          park: park,
          attractions: [],
        };
        attractions.forEach((attraction) => {
          if (attraction.area == park.url) {
            newObj.attractions.push({
              ...attraction,
              featured: Math.round(Math.random()) == 1 ? true : false,
            });
          }
        });
        newArray.push(newObj);
      });
      setParksandAttr(newArray);
    }
  }, [parks, attractions]);
  return (
    <>
      {parksandAttr.map((park, i) => {
        return (
          <div key={park.park.url}>
            <Link to={`/parks/${park.park.id}`}>
              <h1>{park.park.name}</h1>
            </Link>

            <CardContainer tileData={park.attractions} />
          </div>
        );
      })}
    </>
  );
};

export default Home;
