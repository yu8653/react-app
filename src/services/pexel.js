const AUTH = process.env.REACT_APP_PEXELS_API_KEY;

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
