import axios from "axios";
//const baseUrl = process.env.REACT_APP_BASE_URL;
const baseUrl = "http://localhost:3003";
const getStations = async () => {
  const response = await axios.get(`${baseUrl}/stations`);
  return response.data;
};

const getStation = async (id) => {
  const response = await axios.get(`${baseUrl}/stations/station/${id}`);
  return response.data;
};

const getTotalCounts = async (id) => {
  const response = await axios.get(
    `${baseUrl}/stations/station/${id}/totalcounts`
  );
  return response.data;
};

const getTotalAverages = async (id) => {
  const response = await axios.get(
    `${baseUrl}/stations/station/${id}/totalavs`
  );
  return response.data;
};

const getAllPopular = async (id) => {
  const response = await axios.get(
    `${baseUrl}/stations/station/${id}/allpopular`
  );
  return response.data;
};

export {
  getStations,
  getStation,
  getTotalCounts,
  getAllPopular,
  getTotalAverages,
};
