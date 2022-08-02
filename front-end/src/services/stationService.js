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

const getDVCounts = async () => {
  const response = await axios.get(
    `${baseUrl}/stations/station/totalcounts/data`
  );
  return response.data;
};

const getDVAverages = async () => {
  const response = await axios.get(`${baseUrl}/stations/station/totalavs/data`);
  return response.data;
};

const getDVPopular = async () => {
  const response = await axios.get(
    `${baseUrl}/stations/station/allpopular/data`
  );
  return response.data;
};

const getMonthCounts = async (id, month) => {
  const response = await axios.get(
    `${baseUrl}/stations/station/${id}/counts/${month}`
  );
  return response.data;
};

const getMonthAverages = async (id, month) => {
  const response = await axios.get(
    `${baseUrl}/stations/station/${id}/avs/${month}`
  );
  return response.data;
};

const getMonthPopular = async (id, month) => {
  const response = await axios.get(
    `${baseUrl}/stations/station/${id}/popular/${month}`
  );
  return response.data;
};

const dvMonthCounts = async (month) => {
  const response = await axios.get(
    `${baseUrl}/stations/station/counts/${month}/data`
  );
  return response.data;
};

const dvMonthAverages = async (month) => {
  const response = await axios.get(
    `${baseUrl}/stations/station/avs/${month}/data`
  );
  return response.data;
};

const dvMonthPopular = async (month) => {
  const response = await axios.get(
    `${baseUrl}/stations/station/popular/${month}/data`
  );
  return response.data;
};

export {
  getStations,
  getStation,
  getTotalCounts,
  getAllPopular,
  getTotalAverages,
  getMonthCounts,
  getMonthAverages,
  getMonthPopular,
  getDVAverages,
  getDVCounts,
  getDVPopular,
  dvMonthAverages,
  dvMonthCounts,
  dvMonthPopular,
};
