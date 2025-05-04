import axios from "axios"


const backend_URL = "http://localhost:5000/api"

export const sendData = async (path) => {
    try {
        const response = await axios.post(`${backend_URL}/path`, {path});
        return response.data;
    } catch (error) {
        console.error("Error sending data:", error);
    }
}
export const fetchPathGraph = async (path) => {
    try {
      const response = await axios.post(`${backend_URL}/path`, { path });
      return response.data; // { nodes: [...], edges: [...] }
    } catch (err) {
      console.error("Error fetching path graph:", err);
      return null;
    }
  };