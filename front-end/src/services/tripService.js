import axios from "axios";
//const baseUrl = process.env.REACT_APP_BASE_URL;
const baseUrl = "http://localhost:3003";
const getTrips = async () => {
  const response = await axios.get(`${baseUrl}/trips`).catch(function (error) {
    return error.toJSON();
  });
  return response.data;
};
const getTripsByDateHour = async (day, hour) => {
  const response = await axios
    .get(`${baseUrl}/hours/${day}/${hour}`)
    .catch(function (error) {
      return error.toJSON();
    });
  return response.data;
};

const postTrip = async (trip) => {
  const response = await axios
    .post(`${baseUrl}/trip`, trip)
    .catch(function (error) {
      return error.toJSON();
    });
  return response.data;
};

export { getTrips, getTripsByDateHour, postTrip };
