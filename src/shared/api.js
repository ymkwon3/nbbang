import axios from "axios";
import { getToken, setToken } from "./localStorage";
// import moment from "moment";

const headers = () => {
  return { authorization: `Bearer ${getToken()}` };
};
axios.defaults.baseURL = "https://redpingpong.shop";
// https://redpingpong.shop/
// http://3.34.129.39

// axios get api
const getAPI = async (api, params) => {
  return await axios
    .get(`${api}`, { headers: headers() })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

// axios post api
const postAPI = async (api, data = {}) => {
  return await axios
    .post(`${api}`, { ...data }, { headers: headers() })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

// axios post FormData api
const postFormAPI = async (api, formData) => {
  return await axios
    .post(`${api}`, formData, {
      headers: Object.assign(headers(), {
        "Content-Type": `multipart/form-data`,
      }),
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

// axios delete api
const deleteAPI = async (api, data = {}) => {
  return await axios
    .delete(`${api}`, { headers: headers(), data })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

// axios patch api
const patchAPI = async (api, data = {}) => {
  return await axios
    .patch(`${api}`, { ...data }, { headers: headers() })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

// axios put api
const putAPI = async (api, data = {}) => {
  return await axios
    .put(`${api}`, { ...data }, { headers: headers() })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export { getAPI, postAPI, deleteAPI, patchAPI, postFormAPI, putAPI };
