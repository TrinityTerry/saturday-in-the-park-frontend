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
};

export default DataManager;
