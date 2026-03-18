import axios from "axios";

// Fake token agar aap use kar rahe hain
const token = "fakeExampleToken";

export default axios.create({

  baseURL: "https://69b7c533ffbcd02860961cc8.mockapi.io/crud/1", 
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});