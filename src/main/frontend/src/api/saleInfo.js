import axios from "axios";

export const regSaleInfo = async(saleData) => {
  try{
    const response = await axios.post("http://localhost:8080/saleInfo", saleData)
    return response
  }catch(e){
    console.log('판매 정보 등록 axios 오류', e)
  }
}

export const getSaleList = async () => {
  try{
    const response = await axios.get("http://localhost:8080/saleInfo/list")
    return response
  }catch(e){
    console.log('판매 정보 조회 axios 오류'. e)
  }
}