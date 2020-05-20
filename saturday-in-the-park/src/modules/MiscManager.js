const MiscManager = {
  getRandomPic(count) {
    return fetch(`https://picsum.photos/v2/list?page=2&limit=${count}&random=1`).then((resp) => resp.json());
  },
};
export default MiscManager