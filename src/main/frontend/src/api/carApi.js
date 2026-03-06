import axios from "axios"

export const regCarInfo = async (carData) => {
  try{
    const response = await axios.post("http://localhost:8080/car", carData)
    return response
  }catch(e){
    console.log('차량 정보 등록 axios 오류', e)
  }
}