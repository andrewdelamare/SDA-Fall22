import axios from "axios";
//const baseUrl = process.env.REACT_APP_BASE_URL;
const baseUrl = "http://localhost:3003";

const addStation = async (station) => {
  const response = await axios
    .post(`${baseUrl}/station/new`, station)
    .catch(function (error) {
      return error.toJSON();
    });
  return response.data;
};

const getStations = async () => {
  const response = await axios
    .get(`${baseUrl}/stations`)
    .catch(function (error) {
      return error.toJSON();
    });
  return response.data;
};

const getStation = async (id) => {
  const response = await axios
    .get(`${baseUrl}/stations/station/${id}`)
    .catch(function (error) {
      return error.toJSON();
    });
  return response.data;
};

const getTotalCounts = async (id) => {
  const response = await axios
    .get(`${baseUrl}/stations/station/${id}/totalcounts`)
    .catch(function (error) {
      return error.toJSON();
    });
  return response.data;
};

const getTotalAverages = async (id) => {
  const response = await axios
    .get(`${baseUrl}/stations/station/${id}/totalavs`)
    .catch(function (error) {
      return error.toJSON();
    });
  return response.data;
};

const getAllPopular = async (id) => {
  const response = await axios
    .get(`${baseUrl}/stations/station/${id}/allpopular`)
    .catch(function (error) {
      return error.toJSON();
    });
  return response.data;
};

const getDVCounts = async () => {
  const response = await axios
    .get(`${baseUrl}/stations/station/totalcounts/data`)
    .catch(function (error) {
      return error.toJSON();
    });
  return response.data;
};

const getDVAverages = async () => {
  const response = await axios
    .get(`${baseUrl}/stations/station/totalavs/data`)
    .catch(function (error) {
      return error.toJSON();
    });
  return response.data;
};

const getDVPopular = async () => {
  const response = await axios
    .get(`${baseUrl}/stations/station/allpopular/data`)
    .catch(function (error) {
      return error.toJSON();
    });
  return response.data;
};

const getMonthCounts = async (id, month) => {
  const response = await axios
    .get(`${baseUrl}/stations/station/${id}/counts/${month}`)
    .catch(function (error) {
      return error.toJSON();
    });
  return response.data;
};

const getMonthAverages = async (id, month) => {
  const response = await axios
    .get(`${baseUrl}/stations/station/${id}/avs/${month}`)
    .catch(function (error) {
      return error.toJSON();
    });
  return response.data;
};

const getMonthPopular = async (id, month) => {
  const response = await axios.get(
    `${baseUrl}/stations/station/${id}/popular/${month}`
  );
  return response.data;
};

const dvMonthCounts = async (month) => {
  const response = await axios
    .get(`${baseUrl}/stations/station/counts/${month}/data`)
    .catch(function (error) {
      return error.toJSON();
    });
  return response.data;
};

const dvMonthAverages = async (month) => {
  const response = await axios
    .get(`${baseUrl}/stations/station/avs/${month}/data`)
    .catch(function (error) {
      return error.toJSON();
    });
  return response.data;
};

const dvMonthPopular = async (month) => {
  const response = await axios
    .get(`${baseUrl}/stations/station/popular/${month}/data`)
    .catch(function (error) {
      return error.toJSON();
    });
  return response.data;
};

export {
  addStation,
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
