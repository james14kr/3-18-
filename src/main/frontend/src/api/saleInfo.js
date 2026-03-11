import axios from "axios";

export const regSaleInfo = async(saleData) => {
  try{
    const response = await axios.post("http://localhost:8080/saleInfo", saleData)
    return response
  }catch(e){
    console.log('판매 정보 등록 axios 오류', e)
  }
}