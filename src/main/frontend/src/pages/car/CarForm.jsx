import React, { useEffect, useState } from 'react'
import styles from './CarForm.module.css'
import Input from '../../common/Input'
import Select from '../../common/Select'
import Button from '../../common/Button'
import { getCarInfo, regCarInfo } from '../../api/carApi'

// 제조사 옵션 목록 - 컴포넌트 밖에 선언해야 렌더링마다 재생성되지 않음
const companyOption = [
  {value : '현대', label : '현대'},
  {value : '기아', label : '기아'}
]

const CarForm = () => {

  // 차량 등록 입력값 state
  const[carData, setCarData] = useState({
    company : '',
    modelName : '',
    price : ''
  })

  // 등록된 차량 목록 state
  const[carList, setCarList] = useState([])

  // 유효성 검사 에러 메시지 state (필드별로 관리)
  const[errors, setErrors] = useState({
    company : '',
    modelName : '',
    price : ''
  })

  // 유효성 검사 함수 - 필드명과 값을 받아 에러 메시지 반환
  // 빈 값이면 에러 메시지, 올바른 값이면 빈 문자열 반환
  const validateField = (name, value) => {
    let errorMsg = ''
    switch(name){
      case 'company'   : if(!value) errorMsg = '제조사는 필수 선택입니다!'; break;
      case 'modelName' : if(!value) errorMsg = '모델명은 필수 입력입니다!'; break;
      case 'price'     : if(!value) errorMsg = '가격은 필수 입력입니다!'; break;
    }
    return errorMsg;
  }

  // 입력값 변경 핸들러 - 입력할 때마다 실시간 유효성 검사 실행
  const handleChange = (e) => {
    const {name, value} = e.target
    setCarData(prev => ({...prev, [name] : value}))
    // 해당 필드의 유효성 검사 후 errors state 업데이트
    const errorMsg = validateField(name, value)
    setErrors(prev => ({...prev, [name] : errorMsg}))
  }

  // 등록 버튼 클릭 핸들러
  const submitInfo = async () => {

    // 전체 필드 유효성 검사 (등록 버튼 클릭 시 한 번에 모든 에러 표시)
    const newErrors ={
      company   : validateField('company', carData.company),
      modelName : validateField('modelName', carData.modelName),
      price     : validateField('price', carData.price)
    }

    setErrors(newErrors)
    // Object.values()로 에러 객체의 모든 값을 배열로 변환
    // some(e => e) : 하나라도 빈 문자가 아닌 값(에러)이 있으면 true → 함수 종료
    if(Object.values(newErrors).some(e => e)) return

    try{
      await regCarInfo(carData)
      alert('등록 성공')
      // 등록 성공 후 입력값 및 에러 초기화
      setCarData({modelName : '', company : '', price : ''})
      setErrors({company : '', modelName : '', price : ''})
      await selectCarInfo() // 목록 새로고침
    }catch(e){
      console.log(e)
      alert('등록 실패')
    }
  }

  // 차량 목록 조회 함수
  const selectCarInfo = async () => {
    try{
      const result = await getCarInfo();
      setCarList(result.data)
    }catch(e){
      console.log(e)
    }
  }

  // 컴포넌트 마운트 시 차량 목록 조회
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
            {/* errors.company가 빈 문자가 아닐 때만 에러 메시지 표시 (단락 평가) */}
            {errors.company && <p className={styles.error}>{errors.company}</p>}
          </div>
          <div className={styles.field}>
            <p><span>⚙️</span>모델명</p>
            <Input
              name='modelName'
              value={carData.modelName}
              onChange={handleChange}
              placeholder='모델명을 입력하세요'/>
            {errors.modelName && <p className={styles.error}>{errors.modelName}</p>}
          </div>
          <div className={styles.field}>
            <p><span>💳</span>차량가격</p>
            <Input
              name='price'
              value={carData.price}
              onChange={handleChange}
              placeholder='차량 가격을 입력하세요'/>
            {errors.price && <p className={styles.error}>{errors.price}</p>}
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
              {/* carList.length - index : No를 내림차순으로 표시 */}
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
