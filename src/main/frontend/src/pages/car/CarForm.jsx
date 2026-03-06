import React, { useState } from 'react'
import styles from './CarForm.module.css'
import Input from '../../common/Input'
import Select from '../../common/Select'
import Button from '../../common/Button'
import { regCarInfo } from '../../api/carApi'

const CarForm = () => {

  const[carData, setCarkData] = useState({
    modelNum : '',
    modelName : '',
    company : '',
    price : ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target
    setCarkData(prev => ({...prev, [name] : value}))
  }

  const submitInfo = async () => {
    try{
      await regCarInfo(carData)
      alert('등록 성공')
      setCarkData({modelNum : '', modelName : '', company : '', price : ''})
    }catch(e){
      console.log(e)
      alert('등록 실패')
    }
  }


  return (
    <div>
      <div>
        <div>
          <h2>차량 등록</h2>
        </div>
        <div className={styles.input}>
          <div>
            제조사
            <Select 
              name='company'
              value={carData.company}
              onChange={handleChange}/>
            </div>
          <div>
            모델명
            <Input
              name='modelName'
              value={carData.modelName}
              onChange={handleChange}/>
          </div>
          <div>
            차량가격
            <Input
              name='price'
              value={carData.price}
              onChange={handleChange}/>
          </div>
        </div>
        <div>
          <Button
            onClick={submitInfo}/>
        </div>
      </div>
      <div>

      </div>
    </div>
  )
}

export default CarForm