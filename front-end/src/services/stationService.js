import axios from "axios";
//const baseUrl = process.env.REACT_APP_BASE_URL;
const baseUrl = "http://localhost:3003";
const getStations = async (page) => {
  const response = await axios.get(`${baseUrl}/stations/${page}`);
  return response.data;
};

const getStation = async (id) => {
  const response = await axios.get(`${baseUrl}/stations/station/${id}`);
  return response.data;
};

const getDepartures = async (id) => {
  const response = await axios.get(
    `${baseUrl}/stations/station/${id}/departures`
  );
  return response.data;
};
export { getStations, getStation, getDepartures };
