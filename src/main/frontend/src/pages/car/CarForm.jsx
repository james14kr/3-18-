import React, { useEffect, useState } from 'react'
import styles from './CarForm.module.css'
import Input from '../../common/Input'
import Select from '../../common/Select'
import Button from '../../common/Button'
import { getCarInfo, regCarInfo } from '../../api/carApi'

const CarForm = () => {

  const[carData, setCarkData] = useState({
    company : '',
    modelName : '',
    price : 0
  })
  const[carList, setCarList] = useState([])

  const handleChange = (e) => {
    const {name, value} = e.target
    setCarkData(prev => ({...prev, [name] : value}))
  }

  const submitInfo = async () => {
    try{
      await regCarInfo(carData)
      alert('등록 성공')
      setCarkData({modelNum : '', modelName : '', company : '', price : ''})
      await selectCarInfo()
    }catch(e){
      console.log(e)
      alert('등록 실패')
    }
  }

  const selectCarInfo = async () => {
    try{
      const result = await getCarInfo();
      setCarList(result.data)
    }catch(e){
      console.log(e)
    }
  }

  useEffect(() => {
    selectCarInfo()
  }, []) 


  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <h2>차량 등록</h2>
        <div className={styles.inputGroup}>
          <div className={styles.field}>
            <label>제조사</label>
            <Select
              name='company'
              value={carData.company}
              onChange={handleChange}/>
          </div>
          <div className={styles.field}>
            <label>모델명</label>
            <Input
              name='modelName'
              value={carData.modelName}
              onChange={handleChange}/>
          </div>
          <div className={styles.field}>
            <label>차량가격</label>
            <Input
              name='price'
              value={carData.price}
              onChange={handleChange}/>
          </div>
        </div>
        <div className={styles.btnArea}>
          <Button onClick={submitInfo}/>
        </div>
      </div>
      <div className={styles.listSection}>
        <h2>등록된 차량 정보</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <td>No</td>
              <td>모델번호</td>
              <td>모델명</td>
              <td>제조사</td>
            </tr>
          </thead>
          <tbody>
            {carList.map((car) => (
              <tr key={car.carNum}>
                <td>{car.carNum}</td>
                <td>{car.modelNum}</td>
                <td>{car.modelName}</td>
                <td>{car.company}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CarForm