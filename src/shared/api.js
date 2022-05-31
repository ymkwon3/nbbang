import axios from "axios";
import { getToken } from "./localStorage";

const headers = () => {
  return { authorization: `Bearer ${getToken()}` };
};
// 배포서버에 들어갈 주소 ※매우중요 안지키면 병걸림
axios.defaults.baseURL = "https://redpingpong.shop";

// 테스트서버에 들어갈 주소 ※매우중요 안지키면 병걸림
// axios.defaults.baseURL = "https://lyubov.shop";
 
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
