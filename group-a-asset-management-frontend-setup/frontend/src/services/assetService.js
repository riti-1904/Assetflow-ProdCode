import axios from "axios";

const API_URL = "http://localhost:5219/api/assets";

export const getAssets = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
