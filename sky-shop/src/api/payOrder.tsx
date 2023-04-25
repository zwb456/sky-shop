import axios from "@/utils/request";
export const payOrder = (options:any) => axios.post('/order/payOrder',options)