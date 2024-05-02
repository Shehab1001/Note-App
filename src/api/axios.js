import axios from "axios";

export default axios.create({
  baseURL: "https://note-sigma-black.vercel.app/api/v1",
});
