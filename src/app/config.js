import axios from "axios";
const token = "fakeExampleToken";

export default axios.create({
  baseURL: "https://69b7c533ffbcd02860961cc8.mockapi.io/crud", 
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
