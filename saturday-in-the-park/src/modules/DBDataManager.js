import BaseUrl from "./baseurl";

const DataManager = {
  getParkAreas() {
    return fetch(`${BaseUrl}/areas`).then((response) => response.json());
  },
  getAttractions() {
    return fetch(`${BaseUrl}/attractions`).then((response) => response.json());
  },
};

export default DataManager;
