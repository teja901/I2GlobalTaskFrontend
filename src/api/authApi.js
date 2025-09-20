import api from "./axios";
const signup = async (payload) => {
  const res = await api.post("/auth/signup", payload);
  return res.data;
};

const login = async (payload) => {
  const res = await api.post("/auth/login", payload);
  return res.data; 
};

const me = async (explicitToken) => {
  
  if (explicitToken) {
    const res = await api.get("/auth/me", {
      headers: { Authorization: `Bearer ${explicitToken}` }
    });
    return res.data;
  }
  const res = await api.get("/auth/me");
  return res.data;
};

export default { signup, login, me };
