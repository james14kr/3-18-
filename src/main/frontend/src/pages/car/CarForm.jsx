import React, { useEffect, useState } from 'react'
import styles from './CarForm.module.css'
import Input from '../../common/Input'
import Select from '../../common/Select'
import Button from '../../common/Button'
import { getCarInfo, regCarInfo } from '../../api/carApi'

const companyOption = [
  {value : '현대', label : '현대'},
  {value : '기아', label : '기아'}
]

const CarForm = () => {

  const[carData, setCarData] = useState({
    company : '',
    modelName : '',
    price : ''
  })
  const[carList, setCarList] = useState([])

  const handleChange = (e) => {
    const {name, value} = e.target
    setCarData(prev => ({...prev, [name] : value}))
  }

  const submitInfo = async () => {
    try{
      await regCarInfo(carData)
      alert('등록 성공')
      setCarData({modelName : '', company : '', price : ''})
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
        <div>
          <h2>차량 등록</h2>
        </div>
        <div className={styles.inputGroup}>
          <div className={styles.field}>
            <p><span>🏭</span>제조사</p>
            <Select 
              name='company'
              value={carData.company}
              option={companyOption}
              placeholder='제조사를 선택하세요'
              onChange={handleChange}/>
          </div>
          <div className={styles.field}>
            <p><span>⚙️</span>모델명</p>
            <Input
              name='modelName'
              value={carData.modelName}
              onChange={handleChange}
              placeholder='모델명을 입력하세요'/>
          </div>
          <div className={styles.field}>
            <p><span>💳</span>차량가격</p>
            <Input
              name='price'
              value={carData.price}
              onChange={handleChange}
              placeholder='차량 가격을 입력하세요'/>
          </div>
        </div>
        <div className={styles.btnArea}>
          <Button
            onClick={submitInfo}/>
        </div>
      </div>
      <div className={styles.listSection}>
        <div>
          <h2>등록된 차량 정보</h2>
        </div>
        <div className={styles.tableGroup}>
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
              {carList.map((car, index) => (
                <tr key={index}>
                  <td>{carList.length - index}</td>
                  <td>{car.modelNum}</td>
                  <td>{car.modelName}</td>
                  <td>{car.company}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CarForm