import api from "../lib/axios";

export const getClients = async () => {
  const res = await api.get("/api/clients");
  return res.data;
};
