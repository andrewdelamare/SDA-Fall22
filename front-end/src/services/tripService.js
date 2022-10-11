import axios from "axios";
const baseUrl = `${process.env.REACT_APP_BASE_URL}/hours`;

const getTrips = async () => {
  const response = await axios.get(`${baseUrl}/`).catch(function (error) {
    return error.toJSON();
  });
  return response.data;
};
const getTripsByDateHour = async (day, hour) => {
  const response = await axios
    .get(`${baseUrl}/${day}/${hour}`)
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
