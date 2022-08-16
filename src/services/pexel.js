const AUTH = "563492ad6f9170000100000133f03d6af3ab48d19585e439d2d2a092";

class Pexels {
  getData(url) {
    return fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: AUTH,
      },
    });
  }
}

export default new Pexels();
