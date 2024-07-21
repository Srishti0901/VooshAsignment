import axios from "axios";
import { config } from "../config/config";
const url = "https://vooshbe.onrender.com";

export const signupUser = async (data) => {
  try {
    const res = await axios.post(`${url}user/signup`, data);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const loginUser = async (data) => {
  try {
    const res = await axios.post(`${url}user/login`, data);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const signupGoogleLogin = async () => {
  try {
    const scope =
      "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${config.OAUTH_CLIENTID}&redirect_uri=${config.OAUTH_REDIRECT_URI}&response_type=code&scope=${scope}`;
    window.location.href = url;
  } catch (error) {
    throw error;
  }
};

export const handleGoogleCallback = async (code) => {
  try {
    const callbackurl = `http://localhost:8080/auth/google/callback?code=${code}`;
    const res = await axios.get(callbackurl);
    return res;
  } catch (error) {
    throw error;
  }
};

export const createNewTask = async (data) => {
  const token = sessionStorage.getItem("token");
  try {
    const res = await axios.post(`${url}user/task/create`, data, {
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getAllTask = async (userId) => {
  const token = sessionStorage.getItem("token");
  try {
    const res = await axios.get(`${url}user/task/get?userId=${userId}`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateTask = async (data) => {
  const token = sessionStorage.getItem("token");
  try {
    const res = await axios.patch(`${url}user/task/update`, data, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  const token = sessionStorage.getItem("token");
  try {
    const res = await axios.delete(`${url}user/task/delete?taskId=${taskId}`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
