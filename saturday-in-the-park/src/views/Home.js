import React, { useEffect, useState } from "react";
import { CardContainer } from "../components";
import { DataManager, MiscManager } from "../modules";

const Home = () => {
  const [parks, setParks] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [parksandAttr, setParksandAttr] = useState([]);

  useEffect(() => {
    DataManager.getParkAreas().then(setParks);

    DataManager.getAttractions().then(setAttractions);
  }, []);



  useEffect(() => {
    let newArray = [];
    if (parks.length !== 0 && attractions.length !== 0) {
      MiscManager.getRandomPic(parksandAttr.length).then((photoArray) => {
        console.log(photoArray);
        parks.forEach((park) => {
          let newObj = { park: park, attractions: [] };

          attractions.forEach((attraction, i) => {
            if (attraction.area_id === park.id) {
              newObj.attractions.push({
                id: attraction.id,
                img: photoArray[i].download_url,
                title: attraction.name,
                author: "",
                featured: Math.floor(Math.random() * Math.floor(2)) == 0 ? true : false,
              });
            }
          });
          newArray.push(newObj);
        });

        setParksandAttr(newArray);
      });
    }
  }, [parks, attractions]);
  return (
    <>
      {parksandAttr.map((park) => {
        console.log(park);
        return (
          <>
            <h1>{park.park.name}</h1>
            <CardContainer tileData={park.attractions} />
          </>
        );
      })}
      {/* <CardContainer tileData={parksandAttr} /> */}
    </>
  );
};

export default Home;
