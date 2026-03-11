import React, { useEffect, useState } from 'react'
import Input from '../../common/Input'
import Select from '../../common/Select'
import { getCarInfo } from '../../api/carApi'
import Button from '../../common/Button'
import { useNavigate } from 'react-router-dom'
import { regSaleInfo } from '../../api/saleInfo'

const colorOption = [
  {value : '화이트', label : '화이트'},
  {value : '레드', label : '레드'},
  {value : '블랙', label : '블랙'}
]

const Register = () => {

  const nav = useNavigate();

  const [saleData, setSaleData] = useState({
    buyerName : '',
    color : '',
    modelName : '', 
    phone : ''
  })

  const [modelOption, setModelOption] = useState([])

  const handleChange = (e) => {
    const {name, value} = e.target
    setSaleData(prev => ({...prev, [name] : value}))
  }

  const submitInfo = async() => {
    try{
      await regSaleInfo(saleData)
      alert('등록 성공')
      setSaleData({buyerName : '', color : '', modelName : '', phone : ''})
      nav('/list')
    }catch(e){
      console.log(e)
    }
  }


  useEffect(() => {
    const fetchModel = async () => {
      const result = await getCarInfo()

      const option = result.data.map((car) => ({
        value : car.modelNum,
        label : car.modelName  
      }))

      setModelOption(option)
    }

    fetchModel()
  },[])  

  return (
    <div>
      <div>
        <div>
          <h2>판매 정보 등록</h2>
        </div>
        <div>
          <div>
            <p>구매자명</p>
          </div>
          <Input
            name='buyerName'
            value={saleData.buyerName}
            onChange={handleChange}
          />
        </div>
        <div>
          <div>
            <p>색상</p>
          </div>
          <Select
            name='color'
            value={saleData.color}
            option={colorOption}
            placeholder='색상을 선택하세요'
            onChange={handleChange}
          />
        </div>
        <div>
          <div>
            <p>모델</p>
          </div>
          <Select
            name='modelName'
            value={saleData.modelName}
            option={modelOption}
            placeholder='모델을 선택하세요'
            onChange={handleChange}
          />
        </div>
        <div>
          <div>
            <p>연락처</p>
          </div>
          <Input
            name='phone'
            value={saleData.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <Button
            onClick={submitInfo}
          />
        </div>
      </div>
    </div>
  )
}

export default Register