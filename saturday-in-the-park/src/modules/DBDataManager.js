import BaseUrl from "./baseurl";

const DataManager = {
  getParkAreas() {
    return fetch(`${BaseUrl}/parkareas`).then((response) => response.json());
  },
  loginUser(userInfo) {
    return fetch(`${BaseUrl}/login/`, {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((resp) => resp.json())
      .catch((e) => console.log(e, "from catch"));
  },
  getUserInfo(tokenObj) {
    return fetch(`${BaseUrl}/get_user/`, {
      method: "POST",
      body: JSON.stringify(tokenObj),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((resp) => resp.json())
      .catch((e) => console.log(e, "from catch"));
  },
  getAttractions() {
    return fetch(`${BaseUrl}/attractions`).then((response) => response.json());
  },
  getUserItineraries(token) {
    return fetch(`${BaseUrl}/itineraries`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((resp) => resp.json())
      .catch((e) => console.log(e, "from catch"));
  },
  getParkArea(id) {
    return fetch(`${BaseUrl}/parkareas/${id}`).then((response) =>
      response.json()
    );
  },
  getParkAreaByUrl(url) {
    return fetch(url).then((response) => response.json());
  },
  getItenerayWithAreaInfo(user) {
    return this.getUserItineraries(user.token).then((resp) => {
      if (resp.length > 0) {
        let areas = {};
        resp.forEach((item) => {
          areas[item.attraction.area] = item.attraction.area;
        });
        
        let areaPromies = Object.keys(areas).map((area) =>
          this.getParkAreaByUrl(area).then((resp) => {
            areas[area] = resp;
          })
        );

        return Promise.all(areaPromies).then(() => {
          let newArray = resp.map((item) => {
            let newObj = { ...item };
            let attractionarea = areas[item.attraction.area];
            newObj.attraction.area = attractionarea;
            return newObj;
          });

          return newArray;
        });
      }
    });
  },
};

export default DataManager;
