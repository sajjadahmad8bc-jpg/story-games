import axios from "axios";
const token = "fakeExampleToken";

export default axios.create({
  baseURL: "https://68c02ee30b196b9ce1c3870f.mockapi.io/users", 
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
