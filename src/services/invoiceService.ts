import axios from "@/lib/axios";

export const getInvoices = async () =>
  (await axios.get("/api/invoices")).data;

export const createInvoice = async (data: any) =>
  (await axios.post("/api/invoices", data)).data;
