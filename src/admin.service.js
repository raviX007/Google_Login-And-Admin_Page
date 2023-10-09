import http from "./http-common";

const getAll = () => {
  return http.get("http://127.0.0.1:5000/users");
};

const create = (data) => {
  return http.post("http://127.0.0.1:5000/users", data);
};

const update = (id, data) => {
  return http.put(`http://127.0.0.1:5000/users/${id}`, data);
};

const remove = (id) => {
  return http.delete(`http://127.0.0.1:5000/users/${id}`);
};
const updateBot = (data) => {
  console.log("data in service is : ", data)
  return http.put(`http://127.0.0.1:5000/bot`,data);
};

export const AdminService = {
    getAll,
    create,
    update,
    updateBot,
    remove,
  };

export default AdminService;