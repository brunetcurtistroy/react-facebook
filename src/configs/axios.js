import axios from "axios";

const metaToken = document.getElementById("metaToken").getAttribute('content');

const instance = axios.create({
  // .. where we make our configurations
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Meta-Token": metaToken
  }
});

export default instance;
