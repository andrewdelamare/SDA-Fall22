import axios from "axios";
//const baseUrl = process.env.REACT_APP_BASE_URL;
const baseUrl = "http://localhost:3003";
const getTrips = async () => {
  const response = await axios.get(`${baseUrl}/trips`);
  return response.data;
};
const getTripsByDateHour = async (day, hour) => {
  const response = await axios.get(`${baseUrl}/hours/${day}/${hour}`);
  return response.data;
};

export { getTrips, getTripsByDateHour };
